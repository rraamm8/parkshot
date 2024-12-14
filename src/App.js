import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { FaHome } from 'react-icons/fa';

import Home from './00/Home';
import Map from './01/Map';
import Reserve from './02/Reserve';
import Favorite from './03/Favorite';
import Community from './04/Community';
import Score from './05/Score';
import Contact from './06/Contact';

import './App.css';

function App() {
  useEffect(() => {
    // 네이버 지도 API 스크립트 동적으로 추가
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    if (!clientId) {
      console.error('Naver Client ID is not defined!');
      return;
    }

    console.log('Naver Client ID:', clientId);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      console.log('Naver Maps API loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Naver Maps API');
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}>
      <BrowserRouter>
        <div className="w-full xl:w-10/12 h-screen mx-auto flex flex-col justify-center items-center">
          <header className="w-full h-20 flex justify-between items-center bg-slate-200">
            <p className="text-2xl font-bold p-5">PARKSHOT</p>
            <ul className="flex justify-center items-center text-xl font-bold">
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/">Home</Link>
              </li>
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/map">코스 찾기</Link>
              </li>
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/reserve">예약</Link>
              </li>
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/favorite">즐겨찾기</Link>
              </li>
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/community">커뮤니티</Link>
              </li>
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/score">스코어보드</Link>
              </li>
              <li className="mx-4 p-2 hover:bg-slate-700 hover:text-white rounded-md">
                <Link to="/contact">제휴 문의</Link>
              </li>
            </ul>
            <p className="text-4xl font-bold p-5">
              <Link to="/"><FaHome /></Link>
            </p>
          </header>
          <main className="w-full flex-grow flex flex-col items-center overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/community" element={<Community />} />
              <Route path="/score" element={<Score />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <footer className="w-full h-20 flex-shrink-0 flex justify-center items-center bg-black text-white">
            <p className="text-center">K-digital 8기 미니프로젝트</p>
          </footer>
        </div>
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;
