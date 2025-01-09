import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 locale 가져오기
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyPage.css";

const locales = {
  ko: ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay: (date) => getDay(date, { locale: ko }),
  locales,
});

function MyPage() {
  const [userInfo, setUserInfo] = useState({ email: "" });
  const [reservations, setReservations] = useState([]); // 예약 목록

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUserInfo({
        email: storedUsername || "이메일 없음",
      });
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      console.error("Username is null or undefined for reservations.");
      return;
    }

    fetch(`http://10.125.121.226:8080/reservations/${storedUsername}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = (data || []).sort((a, b) => {
          // 날짜와 시간 기준 내림차순 정렬
          const dateComparison =
            new Date(a.reservationDate) - new Date(b.reservationDate);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return a.reservationTime.localeCompare(b.reservationTime);
        });
        setReservations(sortedData);
      })
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  const handleDelete = (reservationId) => {
    fetch(`http://10.125.121.226:8080/reservations/${reservationId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setReservations((prevReservations) =>
            prevReservations.filter(
              (reservation) => reservation.reservationId !== reservationId
            )
          );
          alert("예약이 삭제되었습니다.");
        } else {
          alert("예약 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
        alert("예약 삭제 중 오류가 발생했습니다.");
      });
  };

  // 랜덤 색상을 생성하는 함수
  const generateColor = (id) => {
    // 10가지 고정 색상 정의
    const colors = [
      "#66023c", // 붉은색
      "#186158", // 녹색
      "#023c66", // 하늘색
      "#b8646a", // 핑크색
      "#daa520", // 노란색
      "#088da5", // 청록색
      "#660066", // 보라색
      "#0a75ad", // 파란색
      "#20b2aa", // 민트색
      "#ff7f50", // 주황색
    ];
  
    if (typeof id !== "number") {
      return "#cccccc"; // 기본 색상 (id가 유효하지 않을 때)
    }
  
    // 색상 배열에서 %10 결과값으로 색상 선택
    return colors[id % 10];
  };

  // 예약 데이터를 react-big-calendar 형식으로 변환
  const events = reservations.map((reservation) => {
    const courseId = reservation.courseId?.courseId || 0; // courseId 추출 및 기본값 설정
    console.log("CourseId (숫자):", courseId); // 디버깅용 로그
    return {
      title: reservation.courseId?.name || "골프장 이름 없음", // 골프장 이름
      start: new Date(
        reservation.reservationDate + "T" + reservation.reservationTime
      ),
      end: new Date(
        reservation.reservationDate + "T" + reservation.reservationTime
      ),
      id: reservation.reservationId, // 예약 ID
      reservationTime: reservation.reservationTime, // 예약 시간
      courseId, // courseId 저장
      color: generateColor(courseId), // 색상 생성
    };
  });     

  return (
    <div className="mypage-container">
      <h1 className="mypage-title p-4">마이페이지</h1>

      {/* 사용자 정보 표시 */}
      <div className="mypage-info">
        <p><strong>이메일:</strong> {userInfo.email}</p>
      </div>

      {/* 기존 예약 내역 테이블 */}
      <div className="mypage-reservations">
        <h2 className="text-xl p-3 font-bold">내 골프장 예약 목록</h2>
        {reservations.length === 0 ? (
          <p>예약된 내역이 없습니다.</p>
        ) : (
          <table className="mypage-table">
            <thead>
              <tr>
                <th>예약 번호</th>
                <th>골프장 이름</th>
                <th>날짜</th>
                <th>시간</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.courseId.name}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(reservation.reservationId)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* BigCalendar 추가 */}
      <div className="mypage-calendar">
        <h2 className="text-xl p-4 font-bold">예약 내역 캘린더</h2>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={{
            previous: "◀이전",
            today: "오늘",
            next: "다음▶",
            month: "달력",
            week: "주간",
            day: "일간",
            agenda: "예약내역",
            agendaHeader: "예약 내역", // 예약 내역 보기 헤더
            date: "날짜", // 컬럼명 Date → 날짜
            time: "시간", // 컬럼명 Time → 시간
            event: "이벤트", // 컬럼명 Event → 이벤트
            noEventsInRange: "선택한 기간에 예약 내역이 없습니다.",
          }}
          formats={{
            dateFormat: "d", // 날짜 (1, 2, 3 등 숫자)
            dayFormat: (date) => format(date, "eee", { locale: ko }), // 월, 화, 수 (짧은 요일)
            dayHeaderFormat: (date) =>
              format(date, "M월 d일 (eeee)", { locale: ko }), // 1월 1일 (월요일)
            monthHeaderFormat: (date) =>
              format(date, "yyyy년 M월", { locale: ko }), // 2025년 1월
            dayRangeHeaderFormat: ({ start, end }) =>
              `${format(start, "M월 d일", { locale: ko })} - ${format(
                end,
                "M월 d일",
                { locale: ko }
              )}`, // 1월 1일 - 1월 7일
            weekdayFormat: (date) =>
              format(date, "eee", { locale: ko }), // 월, 화, 수 (달력 상단 요일)
            agendaDateFormat: (date) =>
              format(date, "M월 d일 (eeee)", { locale: ko }), // 예약 내역 날짜 포맷
            agendaTimeFormat: (date) =>
              format(date, "HH:mm", { locale: ko }), // 예약 내역 시간 포맷 (24시간제)
          }}
          eventPropGetter={(event) => {
            console.log(event.color); // 색상 확인
            return {
              style: {
                backgroundColor: event.color,
                color: "white", // 가독성을 위한 텍스트 색상
              },
            };
          }}
          onSelectEvent={(event) =>
            alert(`예약 상세: ${event.title}\n시간: ${event.reservationTime}`)
          }
        />
      </div>
    </div>
  );
}

export default MyPage;
