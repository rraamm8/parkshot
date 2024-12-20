import React, { useEffect, useRef, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import "./Map.css";
import useGeolocation from "./useGeolocation";

function Map() {
  const navermaps = useNavermaps();
  const { currentMyLocation } = useGeolocation();
  const [golfCourses, setGolfCourses] = useState([]); // 전체 골프장 데이터
  const [markers, setMarkers] = useState([]); // 지도에 표시할 마커 데이터
  const [searchInput, setSearchInput] = useState(""); // 검색 입력 값
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const mapRef = useRef(null);

  // 네이버 지도 API가 제대로 로드되었는지 확인
  useEffect(() => {
    if (!window.naver?.maps) {
      console.error("Naver maps script not loaded.");
    } else {
      console.log("Naver maps script loaded:", window.naver.maps);
    }
  }, []);
  
  useEffect(() => {
    if (!navermaps?.Service) {
      console.error("Naver maps Service is not available.");
      return;
    }

    // 골프장 데이터 가져오기
    const fetchGolfCourses = async () => {
      try {
        const response = await fetch("http://10.125.121.226:8080/golfcourses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGolfCourses(data); // 전체 골프장 데이터 저장
        const locations = await Promise.all(
          data.map(async (item) => {
            const geo = await fetchGeocode(item.location);
            return geo ? { ...geo, name: item.name } : null;
          })
        );

        setMarkers(locations.filter((loc) => loc !== null));
      } catch (error) {
        console.error("Error fetching golf course data:", error);
      }
    };

    fetchGolfCourses();
  }, [navermaps]);

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

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    // 검색어 정규화
    const normalizedSearchInput = searchInput.trim().toLowerCase();

    // 검색 결과 필터링
    const filteredCourses = golfCourses.filter((course) => {
      const normalizedName = course.name.toLowerCase();
      const normalizedLocation = course.location.toLowerCase();

      return (
        normalizedName.includes(normalizedSearchInput) ||
        normalizedLocation.includes(normalizedSearchInput)
      );
    });

    // 검색 결과 업데이트
    setSearchResults(filteredCourses);

    if (filteredCourses.length === 0) {
      alert("검색된 결과가 없습니다.");
      return;
    }

    // 첫 번째 검색 결과를 기준으로 지도 이동
    const firstResult = filteredCourses[0];
    const geoResult = await fetchGeocode(firstResult.location);

    if (geoResult) {
      mapRef.current.setCenter(
        new navermaps.LatLng(geoResult.lat, geoResult.lng)
      );
      mapRef.current.setZoom(14);
    }
  };

  return (
    <div className="map-container">
      <MapDiv className="map-wrapper">
        <NaverMap
          onLoad={(map) => (mapRef.current = map)}
          defaultCenter={
            new navermaps.LatLng(
              currentMyLocation?.lat || 35.2333798,
              currentMyLocation?.lng || 129.0798453
            )
          }
          defaultZoom={14}
          zoomControl
          zoomControlOptions={{
            position: navermaps.Position.BOTTOM_RIGHT,
          }}
          scaleControl
          logoControl={false}
          mapDataControl={false}
        >
          {currentMyLocation &&
            currentMyLocation.lat &&
            currentMyLocation.lng && (
              <Marker
                position={
                  new navermaps.LatLng(
                    currentMyLocation.lat,
                    currentMyLocation.lng
                  )
                }
              />
            )}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={new navermaps.LatLng(marker.lat, marker.lng)}
              title={marker.name}
            />
          ))}
        </NaverMap>
      </MapDiv>

      {/* 검색 필드와 버튼 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="골프장 이름 또는 주소를 입력하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          검색
        </button>
      </div>

      {/* 검색 결과 표시 */}
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="search-result-item">
            <strong>{result.name}</strong> - {result.location}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;