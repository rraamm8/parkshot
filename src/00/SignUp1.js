import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./SignUp.css"; // 스타일 파일 불러오기

function SignUp1() {
  const navigate = useNavigate();

  const handleEmailSignUp = async () => {
    const memberData = {
      username: "testuser", // 입력된 사용자 이름
      password: "testpassword", // 입력된 비밀번호
      name: "Test Name", // 입력된 이름
      enabled: true, // 활성화 여부
    };

    try {
      const response = await fetch("http://localhost:8080/member/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData), // 데이터를 JSON 형태로 변환
      });

      if (response.ok) {
        alert("회원가입 성공!");
        navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        alert("회원가입 실패!");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 요청에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      {/* 회원가입 제목 */}
      <h1 className="signup-title">회원가입</h1>

      {/* 회원가입 버튼 */}
      <div className="signup-buttons">
        <button className="signup-btn email" onClick={handleEmailSignUp}>
          이메일로 회원가입 →
        </button>
        <button className="signup-btn naver">네이버로 회원가입 →</button>
        <button className="signup-btn kakao">카카오로 회원가입 →</button>
        <button className="signup-btn google">구글로 회원가입 →</button>
      </div>
    </div>
  );
}

export default SignUp1;
