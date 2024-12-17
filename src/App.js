import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavermapsProvider } from 'react-naver-maps';

import "./App.css";
import Home from "./00/Home";
import SignUp1 from "./00/SignUp1";
import SignUp2 from "./00/SignUp2";
import Login from "./00/Login";
import Map from "./01/Map";
import Reserve from "./02/Reserve";
import Favorite from "./03/Favorite";
import Community from "./04/Community";
import Score from "./05/Score";
import Contact from "./06/Contact";

function App() {

  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}>
    <BrowserRouter>
      {/* Nav Bar */}
      <div
        className="w-full xl:w-10/12 h-screen mx-auto
                    flex flex-col justify-center items-center"
      >
        <header className="header">
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/map">코스 찾기</Link>
              </li>
              <li>
                <Link to="/reserve">예약하기</Link>
              </li>
              <li>
                <Link to="/score">스코어보드</Link>
              </li>
              <li>
                <Link to="/community">커뮤니티</Link>
              </li>
            </ul>
            <div className="auth-buttons">
              <Link to="/login">
                <button className="login-btn">로그인</button>
              </Link>
              <Link to="/signup1">
                <button className="signup">회원 가입</button>
              </Link>
            </div>
          </nav>
        </header>

        <main
          className="w-full flex-grow  
                       flex flex-col items-center
                       overflow-y-auto"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup1" element={<SignUp1 />} />
            <Route path="/signup2" element={<SignUp2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/map" element={<Map />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/community" element={<Community />} />
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
    </NavermapsProvider>
  );
}

export default App;
