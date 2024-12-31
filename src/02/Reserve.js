import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Slider from "react-slick"; // react-slick 가져오기
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Reserve.css";

const Reserve = () => {
  const [golfCourses, setGolfCourses] = useState([]); // 모든 구장 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 구장
  const [filteredCourses, setFilteredCourses] = useState([]); // 필터링된 구장 목록
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간
  const [timeSlots, setTimeSlots] = useState([]); // 선택 가능한 시간대

  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams(); // URL에서 courseId 가져오기
  const selectedCourseFromMap = location.state?.course; // Map.js에서 전달된 골프장 데이터

  // API에서 구장 데이터 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://10.125.121.226:8080/golfcourses"
        );
        setGolfCourses(response.data);
        setFilteredCourses(response.data); // 초기에는 모든 구장을 표시

        // 기존 코드 문제: URL의 courseId를 처리하지 않음
        // 수정: courseId가 존재하면 해당 골프장을 선택
        if (courseId) {
          const course = response.data.find(
            (course) => course.courseId.toString() === courseId
          );
          if (course) {
            setSelectedCourse(course);
            setFilteredCourses([course]);
          }
        }
      } catch (error) {
        console.error("구장 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchCourses();
  }, [courseId]); // courseId가 변경될 때마다 실행

  // 날짜 선택 시 시간대 업데이트
  useEffect(() => {
    if (selectedCourse && selectedDate) {
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
      setSelectedTime(null);
    }
  }, [selectedCourse, selectedDate]);

  // 기존 코드 문제: Map.js에서 전달된 상태와 URL courseId를 동시에 처리하지 않음
  // 수정: URL courseId와 Map.js 상태 모두 처리
  useEffect(() => {
    if (selectedCourseFromMap) {
      setSelectedCourse(selectedCourseFromMap);
    }
  }, [selectedCourseFromMap]);

  // 검색 실행 함수
  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim();

    const results = golfCourses.filter((course) => {
      const normalizedName = course.name.trim();
      const normalizedRegion = course.region.trim();
      const normalizedLocation = course.location.trim();

      const isLocationMatch =
        normalizedLocation.includes(normalizedSearchTerm) ||
        normalizedLocation.startsWith(normalizedSearchTerm);

      return (
        normalizedName.includes(normalizedSearchTerm) ||
        normalizedRegion.includes(normalizedSearchTerm) ||
        isLocationMatch
      );
    });

    setFilteredCourses(results);
    setSelectedCourse(null);
    setSelectedDate(null);
    setSelectedTime(null);

    if (results.length === 0) {
      alert("검색된 결과가 없습니다.");
    }


    setSearchTerm("");

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setFilteredCourses([course]);
    navigate(`/reserve/${course.courseId}`, { state: { course } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };


  const toLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const makeReservation = async () => {
    try {

      const username = localStorage.getItem("username");
      const localDateString = toLocalDateString(selectedDate);
      const response = await axios.post(
        "http://10.125.121.226:8080/reservations",
        {
          courseId: selectedCourse.courseId,

          username: username,
          reservationDate: localDateString, // 날짜를 ISO 형식으로

          reservationTime: selectedTime,
        }
      );
      alert("예약 성공!");
    } catch (error) {
      console.error("예약 중 오류 발생:", error);
      alert(error.response?.data || "예약 실패");
    }
  };

  return (
    <div className="reserve-container">
      <h1>골프장 예약하기</h1>

      <div className="search-courses">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="골프장을 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>

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


      {selectedCourse && (
        <div className="back-to-list">
          <button
            onClick={() => {

              setSelectedCourse(null); // 선택된 골프장 초기화
              setFilteredCourses(golfCourses); // 전체 리스트 복원

            }}
          >
            전체 리스트로 돌아가기
          </button>
        </div>
      )}


      {/* 사진 캐러셀 */}

      {selectedCourse && (
        <div className="carousel-container">
          <h2>{selectedCourse.name}의 이미지</h2>
          <Slider {...settings}>
            {["first", "second", "third"].map((name, index) => (
              <div key={index}>
                <img
                  src={`http://10.125.121.226:8080/images/${selectedCourse.courseId}_${name}.jpg`}
                  alt={`${selectedCourse.name} 이미지 ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {selectedCourse && (
        <div className="date-picker">
          <h2>날짜 선택</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
      )}

      {selectedDate && (
        <div className="time-picker">
          <h2>시간 선택</h2>
          <ul className="time-slot-list">
            {timeSlots.map((time, index) => (
              <li
                key={index}
                onClick={() => setSelectedTime(time)}
                className={selectedTime === time ? "selected" : ""}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTime && (
        <div className="confirm-reservation">
          <button onClick={makeReservation}>예약하기</button>
        </div>
      )}
    </div>
  );
};

export default Reserve;
