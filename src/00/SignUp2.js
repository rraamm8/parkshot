import React, { useState } from 'react';
import './SignUp.css';

function SignUp2() {
  // 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // 회원가입 처리 함수
  const handleSignUp = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 데이터 전송
    const requestData = {
      email,
      password,
      nickname,
    };

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('회원가입 성공!');
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      {/* 회원가입 제목 */}
      <h1 className="signup-title">회원가입</h1>

      {/* 입력 폼 */}
      <form className="signup-form" onSubmit={handleSignUp}>
        {/* 이메일 입력 */}
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일 입력"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="confirm-btn">
            중복확인
          </button>
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

        {/* 비밀번호 확인 */}
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* 닉네임 입력 */}
        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            className="signup-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="button" className="confirm-btn">
            중복확인
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="submit-btn">
          회원 가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUp2;