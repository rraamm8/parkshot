import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // SignUp.css 파일 재사용

function LoginInput() {
  const [member_id, setMemberId] = useState(""); // 이메일 입력
  const [password, setPassword] = useState(""); // 비밀번호 입력
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const requestData = { member_id, password };
  
    try {
      console.log("Request Data:", requestData);
  
      const response = await fetch("http://10.125.121.226:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Content-Type:", response.headers.get("Content-Type"));
  
      if (response.ok) {
        // 응답 본문이 JSON인지 확인
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          console.log("Response Data:", responseData);
  
          alert("로그인 성공!");
          navigate("/member");
        } else {
          console.warn("Response is not JSON");
          alert("로그인 성공했지만 응답 데이터가 올바르지 않습니다.");
        }
      } else {
        const errorText = await response.text();
        console.error("Error Response Text:", errorText);
        alert(`로그인 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 요청 중 오류가 발생했습니다.");
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
            value={member_id}
            onChange={(e) => setMemberId(e.target.value)}
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
