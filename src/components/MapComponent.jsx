import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Simulated locations
const CUSTOMER_LOC = [19.0760, 72.8777]; // Mumbai example
const RESTAURANT_LOC = [19.0800, 72.8800];

const MapComponent = ({ status }) => {
    // Rider simulation: start at restaurant, move to customer if status is 'out_for_delivery'
    const [riderPos, setRiderPos] = useState(RESTAURANT_LOC);

    useEffect(() => {
        if (status === 'out_for_delivery') {
            const interval = setInterval(() => {
                setRiderPos(prev => {
                    const latDiff = (CUSTOMER_LOC[0] - prev[0]) * 0.1;
                    const lngDiff = (CUSTOMER_LOC[1] - prev[1]) * 0.1;

                    if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
                        return CUSTOMER_LOC;
                    }
                    return [prev[0] + latDiff, prev[1] + lngDiff];
                });
            }, 1000);
            return () => clearInterval(interval);
        } else if (status === 'delivered') {
            setRiderPos(CUSTOMER_LOC);
        } else {
            setRiderPos(RESTAURANT_LOC);
        }
    }, [status]);

    return (
        <MapContainer center={[19.0780, 72.8790]} zoom={14} style={{ height: '400px', width: '100%', borderRadius: '8px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={RESTAURANT_LOC}>
                <Popup>Restaurant</Popup>
            </Marker>
            <Marker position={CUSTOMER_LOC}>
                <Popup>You (Customer)</Popup>
            </Marker>
            {status !== 'pending' && status !== 'preparing' && status !== 'ready' && (
                <Marker position={riderPos}>
                    <Popup>Rider</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapComponent;
