import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePW.css"; // CSS 파일 추가

function ChangePW() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://10.125.121.226:8080/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 토큰 포함
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/mypage"); // 성공 시 마이페이지로 이동
      } else {
        const errorData = await response.json();
        setError(errorData.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="change-password-container">
      <h1 className="change-password-title">비밀번호 변경</h1>
      <form className="change-password-form" onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}

export default ChangePW;
