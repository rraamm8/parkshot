import React from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

function Map() {
  // useNavermaps 훅을 사용하여 네이버 지도 객체 접근
  const navermaps = useNavermaps();

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '400px', // 지도의 높이
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.5666103, 126.9783882)} // 서울 시청을 중심으로 설정
        defaultZoom={15} // 초기 줌 레벨
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.5666103, 126.9783882)} // 마커 위치
        />
      </NaverMap>
    </MapDiv>
  );
}

export default Map;