import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {

  const [userInfo, setUserInfo] = useState({ email: "" });

  const [reservations, setReservations] = useState([]); // 예약 목록
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");


    console.log("Stored values from localStorage:", { storedUsername }); // 디버깅

    if (storedUsername) {
      setUserInfo({
        email: storedUsername || "이메일 없음",
      });
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // 예약 목록에서 username 가져오기
    if (!storedUsername) {
      console.error("Username is null or undefined for reservations.");
      return;
    }

    fetch(`http://10.125.121.226:8080/reservations/${storedUsername}`)
      .then((response) => response.json())
      .then((data) => setReservations(data || []))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  console.log("Rendering userInfo:", userInfo); // 렌더링 중 상태 확인
  
  return (
    <div className="mypage-container">
      <h1 className="mypage-title">마이페이지</h1>

      {/* 사용자 정보 표시 */}
      <div className="mypage-info">

        <p><strong>이메일:</strong> {userInfo.email}</p>

        <button
          className="mypage-password-button"
          onClick={() => navigate("/change-password")}
        >
          비밀번호 변경
        </button>
      </div>

      <div className="mypage-reservations">
        <h2>내 골프장 예약 목록</h2>
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
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.courseId.name}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyPage;

