import React, { useEffect, useState } from "react";

function Score() {
  const [golfCourses, setGolfCourses] = useState([]); // 전체 데이터
  const [filteredCourses, setFilteredCourses] = useState([]); // 검색 결과
  const [searchInput, setSearchInput] = useState(""); // 검색어

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

  // 검색 입력 처리
  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (!input.trim()) {
      setFilteredCourses(golfCourses);
      return;
    }

    const lowerCaseInput = input.toLowerCase();
    const filtered = golfCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(lowerCaseInput) ||
        course.location.toLowerCase().includes(lowerCaseInput)
    );
    setFilteredCourses(filtered);
  };

  return (
    <main>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchInput}
        onChange={handleSearchInput}
      />
      <ul>
        {filteredCourses.map((course, index) => (
          <li key={index}>
            {course.name} - {course.location}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Score;
