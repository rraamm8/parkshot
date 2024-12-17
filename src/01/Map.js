import React from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import './Map.css';

function Map() {
  const navermaps = useNavermaps();

  return (
    <div className="map-container">
      <MapDiv className="map-wrapper">
        <NaverMap
          defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)} // 부산대 좌표
          defaultZoom={15}
        >
          <Marker
            defaultPosition={new navermaps.LatLng(35.2333798, 129.0798453)}
          />
        </NaverMap>
      </MapDiv>
    </div>
  );
}

export default Map;