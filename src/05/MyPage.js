import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyPage.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
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

  // 예약 데이터를 react-big-calendar 형식으로 변환
  const events = reservations.map((reservation) => ({
    title: reservation.courseId.name,
    start: new Date(reservation.reservationDate + "T" + reservation.reservationTime),
    end: new Date(reservation.reservationDate + "T" + reservation.reservationTime),
    id: reservation.reservationId,
    reservationTime: reservation.reservationTime, // 예약 시간 추가
  }));

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
          onSelectEvent={(event) => alert(`예약 상세: ${event.title}\n시간: ${event.reservationTime}`)}
        />
      </div>
    </div>
  );
}

export default MyPage;
