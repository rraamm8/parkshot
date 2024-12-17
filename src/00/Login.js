import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./SignUp.css"; // 스타일 파일 불러오기

function Login() {
  return (
    <div className="signup-container">
      {/* 회원가입 제목 */}
      <h1 className="signup-title">로그인</h1>

      {/* 회원가입 버튼 */}
      <div className="signup-buttons">
        <Link to="/signup2">
          <button className="signup-btn email">이메일로 로그인 →</button>
        </Link>
        <button className="signup-btn naver">네이버로 로그인 →</button>
        <button className="signup-btn kakao">카카오로 로그인 →</button>
        <button className="signup-btn google">구글로 로그인 →</button>
      </div>
    </div>
  );
}

export default Login;
