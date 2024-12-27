import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./Reserve.css";

const Reserve = () => {
  const [golfCourses, setGolfCourses] = useState([]); // 모든 구장 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 구장
  const [filteredCourses, setFilteredCourses] = useState([]); // 필터링된 구장 목록
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간
  const [timeSlots, setTimeSlots] = useState([]); // 선택 가능한 시간대

  // API에서 구장 데이터 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://10.125.121.226:8080/golfcourses"
        );
        setGolfCourses(response.data);
        setFilteredCourses(response.data); // 초기에는 모든 구장을 표시
      } catch (error) {
        console.error("구장 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchCourses();
  }, []);

  // 날짜 선택 시 시간대 업데이트
  useEffect(() => {
    if (selectedCourse && selectedDate) {
      // 시간대 변경
      const generatedTimeSlots = [
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ];
      setTimeSlots(generatedTimeSlots);
      setSelectedTime(null); // 시간 선택 초기화
    }
  }, [selectedCourse, selectedDate]);

  // 검색 실행 함수
  const handleSearch = () => {
    const results = golfCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        course.region.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredCourses(results);
    setSelectedCourse(null); // 검색 실행 시 선택된 구장을 초기화
    setSelectedDate(null); // 날짜 초기화
    setSelectedTime(null); // 시간 초기화
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 골프장 선택 시 처리
  const handleCourseSelect = (course) => {
    setSelectedCourse(course); // 선택된 구장을 저장
    setFilteredCourses([course]); // 선택된 구장만 남김
  };

  return (
    <div className="reserve-container">
      <h1>골프장 예약하기</h1>

      {/* 검색창 */}
      <div className="search-courses">
        {/* <h2>골프장 검색</h2> */}
        <div className="search-input-container">
          <input
            type="text"
            placeholder="골프장을 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress} // 엔터 키 이벤트
          />
          <button onClick={handleSearch}>검색</button> {/* 검색 버튼 */}
        </div>
      </div>

      {/* 골프장 목록 */}
      <div
        className={`course-grid ${
          filteredCourses.length === 1 ? "single" : ""
        }`}
      >
        {filteredCourses.map((course) => (
          <div
            key={course.courseId}
            className={`course-card ${
              selectedCourse === course ? "selected" : ""
            }`}
            onClick={() => handleCourseSelect(course)}
          >
            <h3>{course.name}</h3>
            <p>{course.location}</p>
            <p>{course.contact}</p>
          </div>
        ))}
      </div>

      {/* 날짜 선택 */}
      {selectedCourse && (
        <div className="date-picker">
          <h2>날짜 선택</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
      )}

      {/* 시간 선택 */}
      {selectedDate && (
        <div className="time-picker">
          <h2>시간 선택</h2>
          <ul className="time-slot-list">
            {timeSlots.map((time, index) => (
              <li
                key={index}
                onClick={() => setSelectedTime(time)} // 시간 선택 처리
                className={selectedTime === time ? "selected" : ""}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 예약 버튼 */}
      {selectedTime && (
        <div className="confirm-reservation">
          <button onClick={() => alert(`예약 완료: ${selectedDate}, ${selectedTime}`)}>
            예약하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Reserve;
