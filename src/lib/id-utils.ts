/**
 * MPJ Identity System Utilities
 * 
 * NIP Format: [YY][RR][XXX] - Clean without dots
 * NIAM Format: [ROLE][YY][RR][XXX][KK] - Clean without dots
 */

/**
 * Formats NIP for display (with dots) or clean (without dots)
 * @param nip - The NIP string, can be in dot format (26.01.001) or clean (2601001)
 * @param clean - If true, returns without dots. If false, returns with dots
 */
export const formatNIP = (nip: string | null | undefined, clean: boolean = true): string => {
  if (!nip) return '';
  
  // Remove all dots first
  const cleaned = nip.replace(/\./g, '');
  
  if (clean) {
    return cleaned;
  }
  
  // Format with dots: YY.RR.XXX
  if (cleaned.length === 7) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4)}`;
  }
  
  return nip;
};

/**
 * Formats NIAM for display (with dots) or clean (without dots)
 * @param niam - The NIAM string, can be in dot format (AM.26.01.001.01) or clean (AM260100101)
 * @param clean - If true, returns without dots. If false, returns with dots
 */
export const formatNIAM = (niam: string | null | undefined, clean: boolean = true): string => {
  if (!niam) return '';
  
  // Remove all dots first
  const cleaned = niam.replace(/\./g, '');
  
  if (clean) {
    return cleaned;
  }
  
  // Format with dots: ROLE.YY.RR.XXX.KK
  // Role can be 2 chars (AM, AN, DM, etc.)
  const roleMatch = cleaned.match(/^([A-Z]{2})(\d+)$/);
  if (roleMatch) {
    const role = roleMatch[1];
    const numbers = roleMatch[2];
    if (numbers.length === 9) {
      return `${role}.${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4, 7)}.${numbers.slice(7)}`;
    }
  }
  
  return niam;
};

/**
 * Parse NIP into components
 */
export const parseNIP = (nip: string): { year: string; region: string; sequence: string } | null => {
  const cleaned = nip.replace(/\./g, '');
  if (cleaned.length !== 7) return null;
  
  return {
    year: cleaned.slice(0, 2),
    region: cleaned.slice(2, 4),
    sequence: cleaned.slice(4),
  };
};

/**
 * Parse NIAM into components
 */
export const parseNIAM = (niam: string): { 
  role: string; 
  year: string; 
  region: string; 
  sequence: string; 
  crewNumber: string 
} | null => {
  const cleaned = niam.replace(/\./g, '');
  const match = cleaned.match(/^([A-Z]{2})(\d{2})(\d{2})(\d{3})(\d{2})$/);
  
  if (!match) return null;
  
  return {
    role: match[1],
    year: match[2],
    region: match[3],
    sequence: match[4],
    crewNumber: match[5],
  };
};

/**
 * Get XP level badge info based on XP amount
 */
export type XPLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export const getXPLevel = (xp: number): { level: XPLevel; label: string; color: string; icon: string; minXP: number; maxXP: number } => {
  if (xp >= 5000) {
    return { 
      level: 'platinum', 
      label: 'Jawara', 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500', 
      icon: '💎',
      minXP: 5000,
      maxXP: Infinity
    };
  }
  if (xp >= 2000) {
    return { 
      level: 'gold', 
      label: 'Pejuang', 
      color: 'bg-gradient-to-r from-yellow-400 to-amber-500', 
      icon: '🥇',
      minXP: 2000,
      maxXP: 5000
    };
  }
  if (xp >= 500) {
    return { 
      level: 'silver', 
      label: 'Santri Giat', 
      color: 'bg-gradient-to-r from-slate-400 to-slate-500', 
      icon: '🥈',
      minXP: 500,
      maxXP: 2000
    };
  }
  return { 
    level: 'bronze', 
    label: 'Khodim Baru', 
    color: 'bg-gradient-to-r from-orange-400 to-orange-600', 
    icon: '🥉',
    minXP: 0,
    maxXP: 500
  };
};

/**
 * Profile Level System
 * - SILVER (Basic Active): Account is active
 * - GOLD: Profile stage 2 data is filled
 * - PLATINUM (Verified): All ERD profile data is complete
 */
export type ProfileLevel = 'basic' | 'silver' | 'gold' | 'platinum';

export interface ProfileLevelInfo {
  level: ProfileLevel;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  isVerified: boolean;
}

export const getProfileLevelInfo = (level: ProfileLevel): ProfileLevelInfo => {
  switch (level) {
    case 'platinum':
      return {
        level: 'platinum',
        label: 'Platinum',
        color: 'text-purple-700',
        bgColor: 'bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100',
        borderColor: 'border-purple-300',
        icon: '💎',
        isVerified: true,
      };
    case 'gold':
      return {
        level: 'gold',
        label: 'Gold',
        color: 'text-amber-700',
        bgColor: 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100',
        borderColor: 'border-amber-300',
        icon: '🥇',
        isVerified: false,
      };
    case 'silver':
      return {
        level: 'silver',
        label: 'Silver',
        color: 'text-slate-700',
        bgColor: 'bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100',
        borderColor: 'border-slate-300',
        icon: '🥈',
        isVerified: false,
      };
    default:
      return {
        level: 'basic',
        label: 'Basic',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-200',
        icon: '🏅',
        isVerified: false,
      };
  }
};

/**
 * Determine profile level based on profile data completeness
 */
export const calculateProfileLevel = (profile: {
  status_account?: string;
  nama_pesantren?: string | null;
  nama_pengasuh?: string | null;
  alamat_singkat?: string | null;
  jumlah_santri?: number | null;
  sejarah?: string | null;
  visi_misi?: string | null;
  logo_url?: string | null;
  foto_pengasuh_url?: string | null;
  social_links?: Record<string, unknown> | null;
  latitude?: number | null;
  longitude?: number | null;
}): ProfileLevel => {
  // Not active = basic
  if (profile.status_account !== 'active') {
    return 'basic';
  }
  
  // Check for Platinum (all ERD data complete)
  const platinumFields = [
    profile.nama_pesantren,
    profile.nama_pengasuh,
    profile.alamat_singkat,
    profile.jumlah_santri,
    profile.sejarah,
    profile.visi_misi,
    profile.logo_url,
    profile.foto_pengasuh_url,
    profile.latitude,
    profile.longitude,
  ];
  
  const platinumComplete = platinumFields.every(field => 
    field !== null && field !== undefined && field !== ''
  );
  
  if (platinumComplete) {
    return 'platinum';
  }
  
  // Check for Gold (stage 2 data: sejarah, visi_misi, logo, foto)
  const goldFields = [
    profile.sejarah,
    profile.visi_misi,
    profile.logo_url,
  ];
  
  const goldComplete = goldFields.every(field => 
    field !== null && field !== undefined && field !== ''
  );
  
  if (goldComplete) {
    return 'gold';
  }
  
  // Active account = Silver
  return 'silver';
};
