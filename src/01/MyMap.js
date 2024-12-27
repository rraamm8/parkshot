import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import { useState, useEffect } from "react";

export default function MyMap({ area, markers }) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  // console.log("markers : ", markers);

  const fetchGeocode = async (address) => {
    if (!navermaps?.Service?.geocode) {
      console.error("Geocoding service is not available.");
      return null;
    }

    return new Promise((resolve) => {
      navermaps.Service.geocode({ query: address }, (status, response) => {
        if (
          status === navermaps.Service.Status.OK &&
          response.v2.addresses.length > 0
        ) {
          const { x, y } = response.v2.addresses[0];
          resolve({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          console.error(`Failed to geocode address: ${address}`);
          resolve(null);
        }
      });
    });
  };

  useEffect(() => {
    const loadGeocode = async () => {
      if (area) {
        const position = await fetchGeocode(area);
        if (position && map) {
          map.setCenter(new navermaps.LatLng(position.lat, position.lng));
          setMarkerPosition(new navermaps.LatLng(position.lat, position.lng));
        }
      }
    };
    loadGeocode();
  }, [area, map]); // area와 map이 변경될 때마다 실행

  return (
    <>
      <NaverMap
        defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)}
        defaultZoom={16}
        ref={setMap}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={new navermaps.LatLng(marker.lat, marker.lng)}
            title={marker.name}
          />
        ))}
        {markerPosition && (
          <Marker
            position={markerPosition} // 새로운 마커 위치 설정
          />
        )}
      </NaverMap>
    </>
  );
}
