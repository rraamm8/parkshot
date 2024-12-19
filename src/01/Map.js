import React, { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import './Map.css';
import useGeolocation from './useGeolocation';

function Map() {
  const navermaps = useNavermaps(); // 네이버 지도 API 객체
  const { currentMyLocation } = useGeolocation(); // 현재 위치 가져오기
  const [markers, setMarkers] = useState([]); // API로부터 가져온 마커 데이터
  const [cluster, setCluster] = useState(null); // 클러스터링 객체
  const mapRef = useRef(null); // 지도 객체 참조

  useEffect(() => {
    // 백엔드로부터 골프장 데이터 가져오기
    fetch('http://10.125.121.226:8080/golfcourses') // URL 수정
      .then((response) => response.json())
      .then(async (data) => {
        // 한국어 주소를 좌표로 변환
        const locations = await Promise.all(
          data.map(async (item) => {
            const geo = await fetchGeocode(item.location); // Geocoding API 호출
            return geo;
          })
        );

        // 변환된 좌표 중 유효한 값만 필터링
        const validLocations = locations.filter((loc) => loc !== null);
        setMarkers(validLocations);
      })
      .catch((error) => console.error('Error fetching golf course data:', error));
  }, []);

  // Geocoding을 통해 주소를 좌표로 변환하는 함수
  const fetchGeocode = async (address) => {
    return new Promise((resolve, reject) => {
      navermaps.Service.geocode({ query: address }, (status, response) => {
        if (status === navermaps.Service.Status.OK) {
          const { x, y } = response.v2.addresses[0]; // x: lng, y: lat
          resolve({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          console.error(`Failed to geocode address: ${address}`);
          resolve(null); // Geocoding 실패 시 null 반환
        }
      });
    });
  };

  useEffect(() => {
    if (markers.length && mapRef.current) {
      // 클러스터링 설정
      if (cluster) cluster.setMap(null); // 기존 클러스터 제거

      const newCluster = new navermaps.MarkerClustering({
        minClusterSize: 2,
        maxZoom: 10,
        map: mapRef.current, // 지도 객체 전달
        markers: markers.map(
          (pos) =>
            new navermaps.Marker({
              position: new navermaps.LatLng(pos.lat, pos.lng),
            })
        ),
        disableClickZoom: false,
        gridSize: 120,
      });
      setCluster(newCluster);
    }
  }, [markers, navermaps]);

  return (
    <div className="map-container">
      {/* React-Naver-Maps를 사용하여 지도 생성 */}
      <MapDiv className="map-wrapper">
        <NaverMap
          ref={mapRef} // 지도 객체 참조
          defaultCenter={new navermaps.LatLng(
            currentMyLocation?.lat || 35.2333798,
            currentMyLocation?.lng || 129.0798453
          )} // 현재 위치 또는 기본 좌표 (부산대)
          defaultZoom={14}
          zoomControl
          zoomControlOptions={{
            position: navermaps.Position.BOTTOM_RIGHT,
          }}
          scaleControl
          logoControl={false}
          mapDataControl={false}
        >
          {/* 현재 위치에 마커 표시 */}
          {currentMyLocation && currentMyLocation.lat && currentMyLocation.lng && (
            <Marker
              position={new navermaps.LatLng(
                currentMyLocation.lat,
                currentMyLocation.lng
              )}
            />
          )}
        </NaverMap>
      </MapDiv>
    </div>
  );
}

export default Map;