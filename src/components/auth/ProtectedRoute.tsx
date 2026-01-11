import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

/**
 * TWO-LAYER GLOBAL ACCESS GATE
 * 
 * DEBUG MODE BYPASS:
 * - If location.state.isDebugMode === true, skip all auth checks
 * - This allows /debug-view to navigate to dashboards with mock data
 * 
 * LAYER 1 - STATUS GATE (Global):
 * - NOT authenticated → /login
 * - status = 'pending' → /verification-pending (checks claims for proper routing)
 * - status = 'rejected' → /account-rejected
 * 
 * LAYER 2 - ROLE GATE (Prefix-based):
 * - /admin-pusat/* → role === 'admin_pusat'
 * - /admin-regional/* → role === 'admin_regional'
 * - /user/* → role === 'user'
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, profile, isLoading, signOut } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const hasHandledRejection = useRef(false);
  const [claimCheck, setClaimCheck] = useState<{ 
    checked: boolean; 
    status?: string; 
    jenis_pengajuan?: string;
  }>({ checked: false });

  // Check for debug mode bypass from /debug-view
  const locationState = location.state as { isDebugMode?: boolean } | null;
  const isDebugMode = locationState?.isDebugMode === true;

  // Check claim status for regular users
  useEffect(() => {
    const checkClaim = async () => {
      if (isDebugMode || !user || profile?.role !== 'user') {
        setClaimCheck({ checked: true });
        return;
      }

      try {
        const { data: claim, error } = await supabase
          .from('pesantren_claims')
          .select('status, jenis_pengajuan')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking claim in ProtectedRoute:', error);
          setClaimCheck({ checked: true });
          return;
        }

        setClaimCheck({ 
          checked: true, 
          status: claim?.status || undefined,
          jenis_pengajuan: claim?.jenis_pengajuan || undefined
        });
      } catch (error) {
        console.error('Error in claim check:', error);
        setClaimCheck({ checked: true });
      }
    };

    if (!isLoading && user && profile) {
      checkClaim();
    }
  }, [user, profile, isLoading, isDebugMode]);

  // Handle rejected status - redirect to account-rejected page
  useEffect(() => {
    // Skip rejection handling in debug mode
    if (isDebugMode) return;
    
    if (
      profile?.status_account === 'rejected' && 
      !hasHandledRejection.current &&
      location.pathname !== '/login' &&
      location.pathname !== '/account-rejected'
    ) {
      hasHandledRejection.current = true;
    }
  }, [profile?.status_account, location.pathname, isDebugMode]);

  // Reset rejection handler when user changes
  useEffect(() => {
    if (!user) {
      hasHandledRejection.current = false;
      setClaimCheck({ checked: false });
    }
  }, [user]);

  // ═══════════════════════════════════════════════════════════════
  // DEBUG MODE BYPASS: Skip all auth checks when coming from /debug-view
  // ═══════════════════════════════════════════════════════════════
  if (isDebugMode) {
    return <>{children}</>;
  }

  // Show loading state while fetching auth data or claim data
  if (isLoading || (user && profile?.role === 'user' && !claimCheck.checked)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // LAYER 1: STATUS GATE (executes BEFORE any role logic)
  // ═══════════════════════════════════════════════════════════════

  // Not authenticated → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // No profile found → redirect to login
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // For regular users, check claim-based routing
  if (profile.role === 'user' && claimCheck.checked) {
    const claimStatus = claimCheck.status;
    const jenis = claimCheck.jenis_pengajuan;

    // No claim → redirect to check-institution
    if (!claimStatus) {
      if (location.pathname !== '/check-institution' && location.pathname !== '/institution-submission') {
        return <Navigate to="/check-institution" replace />;
      }
    }

    // Pending status → verification-pending page
    if (claimStatus === 'pending') {
      if (location.pathname !== '/verification-pending') {
        return <Navigate to="/verification-pending" replace />;
      }
      return <>{children}</>;
    }

    // Regional approved → different routing based on jenis_pengajuan
    if (claimStatus === 'regional_approved') {
      if (jenis === 'klaim') {
        // Klaim: Allow dashboard access
        // Continue to role gate
      } else {
        // Pesantren Baru: Redirect to payment
        if (location.pathname !== '/payment' && location.pathname !== '/payment-pending') {
          return <Navigate to="/payment" replace />;
        }
        return <>{children}</>;
      }
    }

    // Rejected → account-rejected page
    if (claimStatus === 'rejected') {
      if (location.pathname !== '/account-rejected') {
        return <Navigate to="/account-rejected" replace />;
      }
      return <>{children}</>;
    }
  }

  // Status = pending → redirect to verification-pending page (fallback for profile status)
  if (profile.status_account === 'pending') {
    // Allow access to verification-pending page itself
    if (location.pathname === '/verification-pending') {
      return <>{children}</>;
    }
    return <Navigate to="/verification-pending" replace />;
  }

  // Status = rejected → redirect to account-rejected page
  if (profile.status_account === 'rejected') {
    // Allow access to account-rejected page itself
    if (location.pathname === '/account-rejected') {
      return <>{children}</>;
    }
    return <Navigate to="/account-rejected" replace />;
  }

  // ═══════════════════════════════════════════════════════════════
  // LAYER 2: ROLE GATE (executes ONLY after status is 'active')
  // ═══════════════════════════════════════════════════════════════

  // Allow access to /403 page for active users
  if (location.pathname === '/403') {
    return <>{children}</>;
  }

  // Check role authorization if allowedRoles specified
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(profile.role)) {
      // Role mismatch → redirect to /403
      // Do NOT infer or redirect to other dashboards
      return <Navigate to="/403" replace />;
    }
  }

  // All gates passed - render children
  return <>{children}</>;
};

export default ProtectedRoute;