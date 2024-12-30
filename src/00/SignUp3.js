import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp3() {
  const [nickname, setNickname] = useState(""); // 닉네임 입력
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 체크 상태
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 오류 메시지
  const navigate = useNavigate();

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://10.125.121.226:8080/member/checkNickname?nickname=${nickname}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.available) {
          setIsNicknameChecked(true);
          setNicknameError("");
          alert("사용 가능한 닉네임입니다.");
        } else {
          setIsNicknameChecked(false);
          setNicknameError("이미 사용 중인 닉네임입니다.");
        }
      } else {
        alert("닉네임 확인 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleAdditionalInfo = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // OAuth 인증 후 저장된 토큰

    if (!token) {
      alert("유효하지 않은 접근입니다. 다시 회원가입하세요.");
      navigate("/signup1");
      return;
    }

    if (!isNicknameChecked) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    const requestData = { nickname };

    try {
      const response = await fetch(
        "http://10.125.121.226:8080/member/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 토큰 포함
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        alert("추가 정보가 성공적으로 등록되었습니다!");
        navigate("/member"); // 성공적으로 등록 후 메인 페이지로 이동
      } else {
        const errorData = await response.json();
        alert(`프로필 등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during profile completion:", error);
      alert("추가 정보 입력 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">추가 정보 입력</h1>
      <form className="signup-form" onSubmit={handleAdditionalInfo}>
        {/* 닉네임 입력 */}
        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            className="signup-input"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsNicknameChecked(false); // 닉네임 변경 시 중복 체크 상태 초기화
            }}
          />
          <button
            type="button"
            className="confirm-btn"
            onClick={handleCheckNickname}
          >
            중복 확인
          </button>
        </div>
        {nicknameError && <p className="error-message">{nicknameError}</p>}

        {/* 제출 버튼 */}
        <button type="submit" className="submit-btn">
          프로필 등록하기
        </button>
      </form>
    </div>
  );
}

export default SignUp3;
