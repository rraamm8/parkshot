import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // SignUp.css 파일 재사용

function LoginInput({ setLoggedIn }) {
  const [member_id, setMemberId] = useState(""); // 이메일 입력
  const [password, setPassword] = useState(""); // 비밀번호 입력
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const requestData = { member_id, password }; // 로그인 데이터

  //   try {
  //     const response = await fetch("http://localhost:8080/login", {
  //       method: "POST", // POST 메서드 사용
  //       headers: {
  //         "Content-Type": "application/json", // JSON 데이터 전송
  //       },
  //       body: JSON.stringify(requestData), // 요청 본문
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       const nickname = responseData.member.nickname; // 닉네임 추출
  //       localStorage.setItem("nickname", nickname); // 로컬 스토리지에 닉네임 저장
  //       alert("로그인 성공!");
  //       setLoggedIn(true); // 로그인 상태 변경
  //       navigate("/member"); // 홈화면으로 이동
  //     } else {
  //       const errorData = await response.json();
  //       alert(`로그인 실패: ${errorData.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     alert("이메일과 비밀번호가 일치하지 않습니다.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestData = { member_id, password }; // 로그인 데이터

    try {
      const response = await fetch("http://10.125.121.226:8080/login", {
        method: "POST", // POST 메서드 사용
        headers: {
          "Content-Type": "application/json", // JSON 데이터 전송
        },
        body: JSON.stringify(requestData), // 요청 본문
      });

      console.log("Response status:", response.status); // 응답 상태 코드 확인

      if (response.ok) {
        // JWT만 반환하는 경우
        const authHeader = response.headers.get("Authorization");
        if (authHeader) {
          const token = authHeader.replace("Bearer ", ""); // 'Bearer '를 제거하고 토큰만 추출
          console.log("token", token);
        }
        // 닉네임을 별도로 반환하는 경우 처리
        if (response.headers.get("Content-Type") === "application/json") {
          const responseData = await response.json();
          const nickname = responseData.member.nickname; // 닉네임 추출
          localStorage.setItem("nickname", nickname); // 로컬 스토리지에 닉네임 저장
        }

        alert("로그인 성공!");
        setLoggedIn(true); // 로그인 상태 변경
        navigate("/member"); // 홈화면으로 이동
      } else {
        // 실패 시 JSON 메시지 처리
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
