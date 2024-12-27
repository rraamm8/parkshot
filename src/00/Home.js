import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // CSS 파일 불러오기
import phoneImage from "../assets/images/phone.png";
import browserImage from "../assets/images/browser.png";

function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // 폼 기본 동작 방지
    if (searchQuery.trim()) {
      navigate(`/map?query=${encodeURIComponent(searchQuery)}`); // 검색어 전달
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  return (
    <div>
      {/* 홈화면 컨텐츠 */}
      <main className="main-content">
        {/* Left Content */}
        <section className="left-content">
          <h1 className="main-title">
            파크샷에서 쉽게
            <br />
            코스 예약과
            <br />
            스코어 관리하세요.
          </h1>
          <p className="subtitle">
            전국 파크골프장 검색, 예약, 코스별 스코어 관리,
            <br />
            커뮤니티 기능까지 한 번에
          </p>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="파크골프장 이름 또는 지역 입력"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">검색 →</button>
          </form>
        </section>

        {/* 홈화면 그림 요소 */}
        <section className="right-content">
          <div className="mockup">
            <img src={phoneImage} alt="폰 목업" className="phone-image" />
            <img
              src={browserImage}
              alt="브라우저 목업"
              className="browser-image"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
