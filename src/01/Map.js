import {
  NavermapsProvider,
  Container as MapDiv,
  useNavermaps,
} from "react-naver-maps";
import MyMap from "./MyMap";
import { useEffect, useState } from "react";
import "./Map.css";
import { useSearchParams } from "react-router-dom";

function Map() {
  const navermaps = useNavermaps();
  const [searchParams] = useSearchParams();
  const [area, setArea] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // 검색 입력 값
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [golfCourses, setGolfCourses] = useState([]); // 전체 골프장 데이터
  const [markers, setMarkers] = useState([]); // 지도에 표시할 마커 데이터
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로드 상태

  // 검색어가 URL에서 전달된 경우 초기화
  useEffect(() => {
    const query = searchParams.get("query"); // URL에서 'query' 파라미터 가져오기
    if (query) {
      setSearchInput(query); // 검색어를 상태에 저장
      handleSearch(query); // 데이터 로드 이후 검색 실행
    }
  }, [searchParams]); // 의존성: 검색 파라미터와 데이터 로드 상태

  // 골프장 데이터를 미리 정규화하여 캐싱 (검색 시 반복 작업 제거)
  const normalizedGolfCourses = golfCourses.map((course) => ({
    ...course,
    normalizedName: course.name.trim(), // 공백 제거
    normalizedRegion: course.region.trim(), 
    normalizedLocation: course.location.trim(), 
  }));

  // 검색 실행 함수
  const handleSearch = (query = searchInput) => {
    const normalizedSearchTerm = query.trim(); // 입력된 검색어에서 공백 제거

    // 미리 정규화된 데이터를 사용해 검색 결과 필터링
    const results = normalizedGolfCourses.filter((course) =>
      course.normalizedName.includes(normalizedSearchTerm) || 
      course.normalizedRegion.includes(normalizedSearchTerm) || 
      course.normalizedLocation.includes(normalizedSearchTerm) 
    );

    // 필터링된 결과를 상태에 저장
    setSearchResults(results);

    // 검색 결과가 없을 경우 알림
    if (results.length === 0) {
      alert("검색된 결과가 없습니다."); // 검색 결과 없음 알림
    } else {
      setArea(results[0].location); // 검색 결과 중 첫 번째 항목의 위치를 지도에 반영
    }
  };

  // 주소를 지오코딩
  const fetchGeocode = async (address) => {
    if (!navermaps?.Service?.geocode) {
      console.error("Geocoding service is not available."); // 지오코딩 서비스 오류
      return null;
    }

    return new Promise((resolve) => {
      navermaps.Service.geocode({ query: address }, (status, response) => {
        if (
          status === navermaps.Service.Status.OK &&
          response.v2.addresses.length > 0
        ) {
          // const { x, y } = response.v2.addresses[0]; // 주소의 위도, 경도 추출
          // resolve({ lat: parseFloat(y), lng: parseFloat(x) }); // 지오코딩 결과 반환
        } else {
          // console.error(`Failed to geocode address: ${address}`); // 지오코딩 실패
          // resolve(null);
        }
      });
    });
  };

  // 골프장 데이터 가져오기
  useEffect(() => {
    if (!window.naver?.maps) {
      console.error("Naver maps script not loaded."); // 네이버 지도 스크립트가 로드되지 않음
    } else {
      console.log("Naver maps script loaded:", window.naver.maps); // 네이버 지도 스크립트 로드 확인
    }
  }, []);

  // 골프장 데이터와 마커 가져오기
  useEffect(() => {
    if (!navermaps?.Service) {
      console.error("Naver maps Service is not available."); // 네이버 지도 서비스 오류
      return;
    }

    const fetchGolfCourses = async () => {
      try {
        const response = await fetch("http://10.125.121.226:8080/golfcourses"); // 골프장 API 호출
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // HTTP 오류 처리
        }
        const data = await response.json(); // API 데이터 JSON으로 변환
        setGolfCourses(data); // 전체 골프장 데이터 저장

        // 주소를 기반으로 지오코딩 수행
        const locations = await Promise.all(
          data.map(async (item) => {
            const geo = await fetchGeocode(item.location); // 지오코딩 수행
            return geo ? { ...geo, name: item.name } : null; // 결과가 있으면 반환
          })
        );

        setMarkers(locations.filter((loc) => loc !== null)); // 유효한 마커만 저장
        setIsDataLoaded(true); // 데이터 로드 완료 상태 설정
      } catch (error) {
        console.error("Error fetching golf course data:", error); // 데이터 가져오기 오류 처리
      }
    };

    fetchGolfCourses(); // 데이터 가져오기 함수 호출
  }, [navermaps]); // 의존성: 네이버 지도 객체

  return (
    <NavermapsProvider>
      <MapDiv className="map-wrapper">
        <MyMap area={area} markers={markers} /> {/* MyMap 컴포넌트 렌더링 */}
      </MapDiv>
      {/* 검색 필드와 버튼 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="골프장 이름 또는 주소를 입력하세요"
          value={searchInput} // 검색 입력 값 바인딩
          onChange={(e) => setSearchInput(e.target.value)} // 입력 값 변경 핸들러
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // 엔터 키 입력 시 검색 실행
            }
          }}
          className="search-input"
        />
        <button onClick={() => handleSearch()} className="search-button">
          검색
        </button>
      </div>
      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={(e) => {
                e.preventDefault();
                setArea(result.location); // 클릭한 결과의 위치를 설정
                console.log(result.location); // 디버깅용 콘솔 출력
              }}
              style={{ cursor: "pointer" }}
            >
              <strong>{result.name}</strong> - {result.location}{" "}
              {/* 검색 결과 */}
            </div>
          ))}
        </div>
      )}
    </NavermapsProvider>
  );
}

export default Map;
