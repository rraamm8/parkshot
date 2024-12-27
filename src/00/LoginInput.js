import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function LoginInput({ setLoggedIn }) {
  const [username, setUsername] = useState(""); // 이메일 입력
  const [password, setPassword] = useState(""); // 비밀번호 입력
  const navigate = useNavigate();

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

    const requestData = { username, password };

    try {
      const response = await fetch("http://10.125.121.226:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        alert(`로그인 실패: ${errorData.message || "알 수 없는 오류"}`);
        return;
      }

      const authHeader = response.headers.get("Authorization");
      if (!authHeader) {
        console.warn("Authorization header not found.");
        alert("로그인 실패: 서버에서 토큰을 전달하지 않았습니다.");
        return;
      }

      const token = authHeader.replace("Bearer ", "").trim();
      if (!token || token.split(".").length !== 3) {
        console.error("Invalid JWT format.");
        alert("서버에서 유효하지 않은 토큰을 전달했습니다.");
        return;
      }

      localStorage.setItem("authToken", token);

      const decodedToken = parseJwt(token);
      if (decodedToken?.memberId) {
        localStorage.setItem("username", decodedToken.memberId);
      } else {
        console.warn("username not found in token payload.");
      }

      alert("로그인 성공!");
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      navigate("/member");
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">로그인</h1>
      <form className="signup-form" onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일 입력"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginInput;
