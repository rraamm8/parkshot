import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./SignUp.css"; // 스타일 파일 불러오기

function SignUp1() {
  return (
    <div className="signup-container">
      {/* 회원가입 제목 */}
      <h1 className="signup-title">회원가입</h1>

      {/* 회원가입 버튼 */}
      <div className="signup-buttons">
        <Link to="/signup2">
          <button className="signup-btn email">이메일로 회원가입 →</button>
        </Link>
        {/* 네이버 회원가입 */}
        <a href="http://10.125.121.226:8080/oauth2/authorization/naver">
          <button className="signup-btn naver">네이버로 회원가입 →</button>
        </a>

        {/* 카카오 회원가입 */}
        <a href="http://10.125.121.226:8080/oauth2/authorization/kakao">
          <button className="signup-btn kakao">카카오로 회원가입 →</button>
        </a>

        {/* 구글 회원가입 */}
        <a href="http://10.125.121.226:8080/oauth2/authorization/google">
          <button className="signup-btn google">구글로 회원가입 →</button>
        </a>
      </div>
    </div>
  );
}

export default SignUp1;
