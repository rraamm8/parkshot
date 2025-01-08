import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleCheckEmail = async () => {
    if (!username.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://10.125.121.226:8080/member/checkUsername?username=${username}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.available) {
          setIsEmailChecked(true);
          alert("사용 가능한 이메일입니다.");
        } else {
          alert("이미 사용 중인 이메일입니다.");
        }
      } else {
        alert("이메일 확인 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error during email check:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

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
          alert("이미 사용 중인 닉네임입니다.");
        }
      } else {
        alert("닉네임 확인 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (e.target.value !== confirmPassword && confirmPassword !== "") {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.value !== password && e.target.value !== "") {
      setPasswordError("비밀번호 불일치");
    } else {
      setPasswordError("");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isEmailChecked) {
      alert("이메일 중복 확인을 먼저 해주세요.");
      return;
    }

    if (!isNicknameChecked) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const requestData = { username, password, nickname };

    try {
      const signUpResponse = await fetch(
        "http://10.125.121.226:8080/member/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (signUpResponse.ok) {
        alert("회원가입 성공!");
        navigate("/signup-success");
      } else {
        const errorData = await signUpResponse.json();
        alert(`회원가입 실패: ${errorData.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("회원가입 중 오류:", error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일 입력"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="button" className="confirm-btn" onClick={handleCheckEmail}>
            중복 확인
          </button>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="signup-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="signup-input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임 입력"
            className="signup-input"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsNicknameChecked(false);
            }}
          />
          <button
            type="button"
            className="confirm-btn"
            onClick={handleCheckNickname}
          >
            중복 확인
          </button>
          {nicknameError && <p className="error-message">{nicknameError}</p>}
        </div>

        <button type="submit" className="submit-btn">
          회원 가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUp2;
