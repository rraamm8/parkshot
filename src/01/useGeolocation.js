import React, { useState, useEffect } from 'react';

function useGeolocation() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error occurred while fetching location:', error);
      }
    );
  }, []);

  return { currentMyLocation: location };
}

export default useGeolocation;