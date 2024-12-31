import React, { useEffect, useState } from "react";
import "./Score.css";

function Score() {
  const [golfCourses, setGolfCourses] = useState([]); // 전체 데이터
  const [holes, setHoles] = useState([]); // 전체 데이터
  const [filteredCourses, setFilteredCourses] = useState([]); // 검색 결과
  const [searchInput, setSearchInput] = useState(""); // 검색어
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [courseId, setCourseId] = useState(null);

  // DB에서 데이터 가져오기
  useEffect(() => {
    const fetchGolfCourses = async () => {
      try {
        const response = await fetch("http://10.125.121.226:8080/golfcourses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGolfCourses(data); // 전체 데이터 저장
        setFilteredCourses(data); // 초기 상태: 전체 리스트 표시
      } catch (error) {
        console.error("Error fetching golf courses:", error);
      }
    };

    fetchGolfCourses();
  }, []);

  useEffect(() => {
    if (!courseId) return; // courseId가 null 또는 undefined일 경우 종료

    const fetchHoles = async () => {
      try {
        const response = await fetch(
          `http://10.125.121.226:8080/hole/${courseId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHoles(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching holes:", error);
      }
    };

    fetchHoles();
  }, [courseId]); // courseId 변경 시 데이터 fetch

  const handleSearch = () => {
    const normalizedSearchInput = searchInput.trim();
  
    const results = golfCourses.filter((course) => {
      const normalizedName = course.name.trim();
      const normalizedLocation = course.location.trim();
      const normalizedRegion = course.region?.trim() || ""; // region이 없을 수도 있으므로 기본값 추가
  
      const isLocationMatch =
        normalizedLocation.includes(normalizedSearchInput) ||
        normalizedLocation.startsWith(normalizedSearchInput);
  
      const isRegionMatch =
        normalizedRegion.includes(normalizedSearchInput) ||
        normalizedRegion.startsWith(normalizedSearchInput);
  
      return (
        normalizedName.includes(normalizedSearchInput) ||
        isLocationMatch ||
        isRegionMatch
      );
    });
  
    setHoles([]);

    setSearchResults(results);
    setFilteredCourses(results);
  
    if (results.length === 0) {
      alert("검색된 결과가 없습니다.");
    }
  };

  // 엔터키 이벤트 핸들러 추가
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색 입력 처리
  // const handleSearchInput = (e) => {
  //   const input = e.target.value;
  //   setSearchInput(input);

  //   if (!input.trim()) {
  //     setFilteredCourses(golfCourses);
  //     return;
  //   }

  //   const lowerCaseInput = input.toLowerCase();
  //   const filtered = golfCourses.filter(
  //     (course) =>
  //       course.name.toLowerCase().includes(lowerCaseInput) ||
  //       course.location.toLowerCase().includes(lowerCaseInput)
  //   );
  //   setFilteredCourses(filtered);
  // };

  return (
    <main className="score-main">
      <h1>스코어보드</h1>
      {/* 검색 필드와 버튼 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="골프장 이름 또는 주소를 입력하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          검색
        </button>
      </div>

      {/* 검색 결과 표시 */}
      <div className={`score-search-results ${searchResults.length > 0 ? "visible" : ""}`}>
        {searchResults.map((result, index) => (
          <div
            key={index}
            className="search-result-item"
            onClick={(e) => {
              e.preventDefault();
              setCourseId(result.courseId);
              console.log(result.courseId);
            }}
            style={{ cursor: "pointer" }}
          >
            <strong>{result.name}</strong> - {result.location}
          </div>
        ))}
      </div>
      {/* 스코어보드 */}
      <div className="score">
        {holes.length > 0 &&
          // holeName별로 그룹화
          [...new Set(holes.map((hole) => hole.holeName))].map((holeName) => {
            // 해당 holeName에 해당하는 홀 필터링
            const holesByName = holes.filter(
              (hole) => hole.holeName === holeName
            );

            return (
              <div key={holeName} className="hole-section">
                <h2>{holeName} 홀</h2>
                <table className="score-table">
                  <thead>
                    <tr>
                      <th></th>
                      {holesByName.map((hole, index) => (
                        <th key={index}>
                          {holeName}-{index + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Par</td>
                      {holesByName.map((hole, index) => (
                        <td key={index}>{hole.par}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>My Score</td>
                      {holesByName.map((hole, index) => (
                        <td key={index}></td>
                      ))}
                    </tr>
                    <tr>
                      <td>Distance (m)</td>
                      {holesByName.map((hole, index) => (
                        <td key={index}>{hole.distance}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Score;