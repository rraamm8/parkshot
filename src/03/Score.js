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
    <main>
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
          <div
            key={index}
            className="search-result-item"
            onClick={(e) => {
              e.preventDefault();
              setCourseId(result.courseId);
              console.log(result.courseId);
            }} // 클릭 시 Geocoding
            style={{ cursor: "pointer" }}
          >
            <strong>{result.name}</strong> - {result.location}
          </div>
        ))}
      </div>
      {/* 스코어보드 */}
      <div className="score">
        {holes.length > 0 && (
          <table className="score-table">
            <thead>
              <tr>
                <th>Hole</th>
                <th>Par</th>
                <th>Distance (m)</th>
              </tr>
            </thead>
            <tbody>
              {holes.map((hole, index) => (
                <tr key={index}>
                  <td>{hole.holeName}</td>
                  <td>{hole.par}</td>
                  <td>{hole.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default Score;
