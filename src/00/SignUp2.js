import React from 'react';
import './SignUp.css'; // 공동 CSS 파일 불러오기

function SignUp2() {
  return (
    <div className="signup-container">
      {/* 회원가입 제목 */}
      <h1 className="signup-title">회원가입</h1>

      {/* 입력 폼 */}
      <form className="signup-form">
        {/* 이메일 입력 */}
        <div className="input-group">
          <input type="email" placeholder="이메일 입력" className="signup-input" />
          <button type="button" className="confirm-btn">중복확인</button>
        </div>

        {/* 비밀번호 입력 */}
        <div className="input-group">
          <input type="password" placeholder="비밀번호 입력" className="signup-input" />
        </div>

        {/* 비밀번호 확인 */}
        <div className="input-group">
          <input type="password" placeholder="비밀번호 확인" className="signup-input" />
        </div>

        {/* 닉네임 입력 */}
        <div className="input-group">
          <input type="text" placeholder="닉네임을 입력하세요.." className="signup-input" />
          <button type="button" className="confirm-btn">중복확인</button>
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="submit-btn">회원 가입하기</button>
      </form>
    </div>
  );
}

export default SignUp2;