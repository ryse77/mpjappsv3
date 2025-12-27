import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationPickerProps {
  latitude: number | null;
  longitude: number | null;
  onLocationChange: (lat: number, lng: number) => void;
}

function DraggableMarker({
  position,
  onDragEnd,
}: {
  position: [number, number];
  onDragEnd: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const pos = marker.getLatLng();
        onDragEnd(pos.lat, pos.lng);
      }
    },
  };

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: LocationPickerProps) {
  // Default to East Java center
  const defaultLat = -7.5;
  const defaultLng = 112.75;

  const [position, setPosition] = useState<[number, number]>([
    latitude ?? defaultLat,
    longitude ?? defaultLng,
  ]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const handleLocationChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationChange(lat, lng);
  };

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: "300px", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onClick={handleLocationChange} />
          <DraggableMarker position={position} onDragEnd={handleLocationChange} />
        </MapContainer>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-md">
          <span className="font-medium">Lat:</span> {position[0].toFixed(6)}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-md">
          <span className="font-medium">Lng:</span> {position[1].toFixed(6)}
        </span>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Klik pada peta atau seret pin untuk menentukan lokasi pesantren
      </p>
    </div>
  );
}
