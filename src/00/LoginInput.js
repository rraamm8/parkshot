import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // SignUp.css 파일 재사용

function LoginInput({ setLoggedIn }) {
  const [member_id, setMemberId] = useState(""); // 이메일 입력
  const [password, setPassword] = useState(""); // 비밀번호 입력
  const navigate = useNavigate();

  // JWT 토큰 디코딩 함수
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to parse JWT:", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestData = { member_id, password }; // 로그인 데이터

    try {
      const response = await fetch("http://10.125.121.226:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response status:", response.status);

      // 토큰 추출
      const authHeader = response.headers.get("Authorization");
      console.log("Authorization header:", authHeader);

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "").trim(); // 'Bearer ' 제거
        console.log("Extracted token:", token);

        if (token) {
          localStorage.setItem("authToken", token); // 로컬 스토리지에 저장

          // 파싱 전에 토큰 유효성 확인
          if (token.split(".").length === 3) {
            const decodedToken = parseJwt(token);
            console.log("Decoded token payload:", decodedToken);

            const memberIdFromToken = decodedToken?.memberId;
            if (memberIdFromToken) {
              localStorage.setItem("member_id", memberIdFromToken);
              console.log("Stored member_id in localStorage:", memberIdFromToken);
            } else {
              console.warn("member_id not found in token payload.");
            }
          } else {
            console.error("Invalid JWT format.");
          }
        } else {
          console.error("Token is empty or undefined.");
        }
      } else {
        console.warn("Authorization header not found.");
        alert("로그인 실패: 서버에서 토큰을 전달하지 않았습니다.");
        return;
      }

      if (response.ok) {
        alert("로그인 성공!");
        localStorage.setItem("loggedIn", "true"); // 로그인 상태 저장
        setLoggedIn(true);
        navigate("/member");
      } else {
        const errorData = await response.json();
        alert(`로그인 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">로그인</h1>
      <form className="signup-form" onSubmit={handleLogin}>
        {/* 이메일 입력 */}
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일 입력"
            className="signup-input"
            value={member_id}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className="submit-btn">
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginInput;
