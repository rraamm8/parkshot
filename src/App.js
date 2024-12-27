import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";

import "./App.css";

import Home from "./00/Home";
import SignUp1 from "./00/SignUp1";
import SignUp2 from "./00/SignUp2";
import SignUpSuccess from "./00/SignUpSuccess";
import LoginInput from "./00/LoginInput";
import Login from "./00/Login";
import MyPage from "./00/MyPage";
import Map from "./01/Map";
import Reserve from "./02/Reserve";
import Favorite from "./03/Favorite";
import Board from "./04/Board";
import BoardWrite from "./04/BoardWrite";
import BoardView from "./04/BoardView";
import BoardEdit from "./04/BoardEdit";
import Score from "./03/Score";
import Contact from "./06/Contact";

// NavBar 컴포넌트
function NavBar({ loggedIn, setLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // localStorage에서 토큰 제거
    localStorage.removeItem("member_id"); // member_id 제거
    localStorage.removeItem("loggedIn"); // 로그인 상태 제거
    setLoggedIn(false); // 로그인 상태 초기화
    alert("로그아웃 되었습니다!");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          {" "}
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/map">코스 찾기</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/reserve">예약하기</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/score">스코어보드</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/board">커뮤니티</Link>{" "}
        </li>
      </ul>
      <div className="auth-buttons">
        {!loggedIn ? (
          <>
            <Link to="/login">
              <button className="login-btn">로그인</button>
            </Link>
            <Link to="/signup1">
              <button className="signup">회원 가입</button>
            </Link>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={handleLogout}>
              로그아웃
            </button>
            <Link to="/mypage">
              <button className="signup">마이페이지</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* 전체 레이아웃 */}
      <div
        className="w-full xl:w-10/12 h-screen mx-auto
                      flex flex-col justify-center items-center"
      >
        <header className="header">
          {/* NavBar에 로그인 상태 전달 */}
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </header>

        <main
          className="w-full flex-grow  
                       flex flex-col items-center"
        >
          <Routes>
            {/* 라우트 설정 */}
            <Route path="/" element={<Home />} />
            <Route path="/member" element={<Home />} />
            <Route path="/signup1" element={<SignUp1 />} />
            <Route path="/signup2" element={<SignUp2 />} />
            <Route path="/loginSuccess" element={<SignUpSuccess />} />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/login-input"
              element={<LoginInput setLoggedIn={setLoggedIn} />}
            />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/board/:id" element={<BoardView />} />
            <Route path="/board/edit/:id" element={<BoardEdit />} />
            <Route path="/score" element={<Score />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer
          className="w-full h-20 flex-shrink-0
                           flex justify-center items-center
                           bg-black text-white"
        >
          <p>K-digital 8기 미니프로젝트</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
