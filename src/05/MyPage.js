import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const [userInfo, setUserInfo] = useState({ nickname: "", email: "", joinDate: "" });
  const [reservations, setReservations] = useState([]); // 예약 목록
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    fetch("http://10.125.121.226:8080/user")
      .then((response) => response.json())
      .then((data) => {
        setUserInfo({
          nickname: data.nickname,
          email: data.email,
          joinDate: data.joinDate ? new Date(data.joinDate).toLocaleDateString() : "" // 날짜 포맷
        });
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }, []);

  // 예약 목록 가져오기
  useEffect(() => {
    fetch("http://10.125.121.226:8080/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data || []))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">마이페이지</h1>

      {/* 사용자 정보 표시 */}
      <div className="mypage-info">
        <p><strong>닉네임:</strong> {userInfo.nickname}</p>
        <p><strong>이메일:</strong> {userInfo.email}</p>
        <p><strong>가입일:</strong> {userInfo.joinDate}</p>
        <button
          className="mypage-password-button"
          onClick={() => navigate("/change-password")}
        >
          비밀번호 변경
        </button>
      </div>

      {/* 예약 목록 표시 */}
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
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.golfCourseName}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
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