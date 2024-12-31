import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";

import Home from "./00/Home";
import SignUp1 from "./00/SignUp1";
import SignUp2 from "./00/SignUp2";
import SignUp3 from "./00/SignUp3";
import SignUpSuccess from "./00/SignUpSuccess";
import LoginInput from "./00/LoginInput";
import Login from "./00/Login";
import OAuthRedirect from "./00/OAuthRedirect";
import Map from "./01/Map";
import Reserve from "./02/Reserve";
import Score from "./03/Score";
import Board from "./04/Board";
import BoardWrite from "./04/BoardWrite";
import BoardView from "./04/BoardView";
import BoardEdit from "./04/BoardEdit";
import MyPage from "./05/MyPage";
import ChangePW from "./05/ChangePW";
import Contact from "./06/Contact";

// NavBar 컴포넌트
function NavBar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // localStorage에서 토큰 제거
    localStorage.removeItem("username"); // username 제거
    localStorage.removeItem("loggedIn"); // 로그인 상태 제거
    setLoggedIn(false); // 로그인 상태 초기화
    alert("로그아웃 되었습니다!");
    navigate("/"); // 로그아웃 후 홈 화면으로 이동
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          {" "}
          <Link to="/">파크샷 홈</Link>{" "}
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
      <div className="w-full h-screen mx-auto
                      flex flex-col justify-center items-center">
        <header className="header">
          {/* NavBar에 로그인 상태 전달 */}
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </header>

        <main className="w-full flex-grow  
                         flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/member" element={<Home />} />
            <Route path="/signup1" element={<SignUp1 />} />
            <Route path="/signup2" element={<SignUp2 />} />
            <Route path="/signup3" element={<SignUp3 />} />
            <Route path="/signup-success" element={<SignUpSuccess />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/login-input" element={<LoginInput setLoggedIn={setLoggedIn} />} />
            <Route path="/oauth2/redirect" element={<OAuthRedirect setLoggedIn={setLoggedIn} />} />
            <Route path="/map" element={<Map />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/reserve/:courseId" element={<Reserve />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/board/:id" element={<BoardView />} />
            <Route path="/board/edit/:id" element={<BoardEdit />} />
            <Route path="/score" element={<Score />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/change-password" element={<ChangePW />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer>
          <p>K-digital 8기 미니프로젝트</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
