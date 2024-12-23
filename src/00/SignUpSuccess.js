import React from 'react';
import { Link } from 'react-router-dom';

function SignUpSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">회원가입 성공!</h1>
      <p className="text-lg text-gray-600 mb-6">
        축하합니다! 회원가입이 완료되었습니다.
      </p>
      <Link
        to="/member"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition"
      >
        홈으로 이동
      </Link>
    </div>
  );
}

export default SignUpSuccess;
