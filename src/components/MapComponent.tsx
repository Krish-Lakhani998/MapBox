'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Read the token from environment variables
// In production, this should be set in .env.local
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoidGVzdHBhcGVyMDgyMSIsImEiOiJjbTg0aDZpbjgxcndzMmtzYWs1cm9scWNxIn0.dlxSTr9vgJxqSkNunVNlbQ';

interface MapComponentProps {
  address: string;
}

interface GeocodingFeature {
  center: [number, number];
  place_name: string;
}

const MapComponent = ({ address }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

  useEffect(() => {
    const geocodeAddress = async (searchAddress: string): Promise<[number, number]> => {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchAddress)}.json?access_token=${mapboxgl.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      
      const data = await response.json();
      if (!data.features || data.features.length === 0) {
        throw new Error('Address not found');
      }
      
      const feature = data.features[0] as GeocodingFeature;
      setFormattedAddress(feature.place_name);
      return feature.center;
    };

    const initializeMap = async () => {
      try {
        if (!address) throw new Error('No address provided');
        
        setLoading(true);
        const coords = await geocodeAddress(address);
        
        if (!map.current) {
          if (mapContainer.current) {
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: 'mapbox://styles/mapbox/streets-v12', // Using 3D-enabled style
              center: coords,
              zoom: 15,
              pitch: 45, // Add 3D perspective
              bearing: -17.6,
              antialias: true
            });

            map.current.addControl(new mapboxgl.NavigationControl());
            
            // Enable 3D buildings
            map.current.on('style.load', () => {
              const mapInstance = map.current;
              if (!mapInstance) return;

              // Ensure the style and layers are loaded
              const style = mapInstance.getStyle();
              if (!style || !style.layers) return;

              const layers = style.layers;
              const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
              )?.id;

              // Add 3D building layer
              mapInstance.addLayer(
                {
                  'id': '3d-buildings',
                  'source': 'composite',
                  'source-layer': 'building',
                  'filter': ['==', 'extrude', 'true'],
                  'type': 'fill-extrusion',
                  'minzoom': 15,
                  'paint': {
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      15.05,
                      ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      15.05,
                      ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                  }
                },
                labelLayerId
              );
            });
          }
        } else {
          map.current.flyTo({
            center: coords,
            zoom: 15,
            pitch: 45,
            bearing: -17.6,
            essential: true,
            duration: 2000
          });
        }

        // Update or create marker
        if (marker.current) {
          marker.current.setLngLat(coords);
        } else if (map.current) {
          marker.current = new mapboxgl.Marker({
            color: '#7C3AED',
            scale: 0.8
          })
            .setLngLat(coords)
            .addTo(map.current);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError(err instanceof Error ? err.message : 'Failed to load the map. Please try again.');
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [address]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="text-sm sm:text-base text-gray-600">Loading map...</div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
          <div className="text-red-400 text-sm sm:text-base text-center max-w-md px-4">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl text-sm hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm sm:text-base text-gray-500 mb-1">Current Location</h2>
            <p className="text-base sm:text-lg text-gray-900 font-medium truncate">
              {formattedAddress || address}
            </p>
          </div>
        </div>
      </div>
      
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapComponent; 