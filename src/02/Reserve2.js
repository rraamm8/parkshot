import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  // Map.js에서 예약하기 연결
  useEffect(() => {
    if (selectedCourseFromMap) {
      setSelectedCourse(selectedCourseFromMap); // 선택된 골프장 설정
    }
  }, [selectedCourseFromMap]);

  // 검색 실행 함수
  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim(); // 검색어에서 공백 제거

    // 검색 결과 필터링
    const results = golfCourses.filter((course) => {
      const normalizedName = course.name.trim(); // 이름에서 공백 제거
      const normalizedRegion = course.region.trim(); // 지역 약칭에서 공백 제거
      const normalizedLocation = course.location.trim(); // 상세 주소에서 공백 제거

      // location에 검색어가 포함되거나, location이 검색어로 시작하는지 확인
      const isLocationMatch =
        normalizedLocation.includes(normalizedSearchTerm) ||
        normalizedLocation.startsWith(normalizedSearchTerm);

      return (
        normalizedName.includes(normalizedSearchTerm) || // 이름 검색
        normalizedRegion.includes(normalizedSearchTerm) || // 약칭(region) 검색
        isLocationMatch // 상세 주소(location) 검색
      );
    });

    // 검색 결과를 상태로 업데이트
    setFilteredCourses(results);

    // 검색 실행 시 초기화
    setSelectedCourse(null);
    setSelectedDate(null);
    setSelectedTime(null);

    if (results.length === 0) {
      alert("검색된 결과가 없습니다."); // 검색 결과 없음 알림
    }

    // 검색어 초기화
    setSearchTerm(""); // input 창 비우기

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
    navigate(`/reserve/${course.courseId}`, { state: { course } });
  };

  // 캐러셀 설정
  const settings = {
    dots: true, // 하단 점 표시 (필요에 따라 제거 가능)
    infinite: true, // 무한 루프 활성화
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 이동할 슬라이드 개수
    arrows: true, // 좌우 화살표 활성화
    autoplay: false, // 자동 이동 비활성화
  };

  // const decodeJwt = (token) => {
  //   if (!token) {
  //     throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
  //   }

  //   // JWT는 header.payload.signature 형식으로 구성
  //   const base64Url = token.split(".")[1]; // payload 부분 추출
  //   if (!base64Url) {
  //     throw new Error("유효하지 않은 토큰 형식입니다.");
  //   }

  //   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split("")
  //       .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
  //       .join("")
  //   );

  //   return JSON.parse(jsonPayload);
  // };

  // const getMemberIdFromToken = () => {
  // const token = localStorage.getItem("username"); // 또는 sessionStorage에서 가져옴
  //   if (!token) {
  //     throw new Error("로그인이 필요합니다.");
  //   }

  //   const decodedToken = decodeJwt(token);
  //   return decodedToken.memberId; // 서버에서 `memberId`를 JWT payload에 포함해야 함
  // };

  const toLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const makeReservation = async () => {
    try {
      const memberId = localStorage.getItem("username");
      const localDateString = toLocalDateString(selectedDate);
      const response = await axios.post(
        "http://10.125.121.226:8080/reservations",
        {
          courseId: selectedCourse.courseId,
          memberId: memberId,
          reservationDate: localDateString, // 날짜를 ISO 형식으로
          reservationTime: selectedTime,
        }
      );
      alert("예약 성공!"); // 성공 메시지 표시
    } catch (error) {
      console.error("예약 중 오류 발생:", error);
      alert(error.response?.data || "예약 실패");
    }
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
        className={`course-grid ${filteredCourses.length === 1 ? "single" : ""
          }`}
      >
        {filteredCourses.map((course) => (
          <div
            key={course.courseId}
            className={`course-card ${selectedCourse === course ? "selected" : ""}`}
            onClick={() => handleCourseSelect(course)}
          >
            <h3>{course.name}</h3>
            <p>{course.location}</p>
            <p>{course.contact}</p>
          </div>
        ))}
      </div>

      {/* 전체 리스트로 돌아가기 버튼 */}
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
          <button onClick={makeReservation}>예약하기</button>
        </div>
      )}
    </div>
  );
};

export default Reserve;
