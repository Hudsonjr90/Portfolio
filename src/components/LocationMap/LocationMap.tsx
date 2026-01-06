import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LocationMap.module.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIcon2x,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RIO_COORDINATES: [number, number] = [-22.872287, -43.526706];

// Componente para invalidar o tamanho do mapa
const MapResizer: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

interface LocationMapProps {
  height?: number;
  width?: string;
  isVisible?: boolean;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  height = 300, 
  width = '100%',
  isVisible = true
}) => {
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isVisible && mapRef.current) {
      const timer = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isClient, isVisible]);

  if (!isClient) {
    return (
      <div 
        className={styles.mapPlaceholder}
        style={{ height: `${height}px`, width }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <div className={styles.mapContainer} style={{ height: `${height}px`, width }}>
      <MapContainer
        center={RIO_COORDINATES}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className={styles.leafletContainer}
        ref={mapRef}
        whenReady={() => {
          if (mapRef.current) {
            setTimeout(() => {
              mapRef.current.invalidateSize();
            }, 100);
          }
        }}
      >
        <MapResizer />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={RIO_COORDINATES} icon={defaultIcon}>
          <Popup>
            <div className={styles.popupContent}>
              <strong>Rio de Janeiro, Brasil</strong>
              <br />
              Minha localização atual
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;