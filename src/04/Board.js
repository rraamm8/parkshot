import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import "./Board.css"; // 통합 CSS 파일

function Board() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // 글쓰기 버튼을 위한 네비게이션 추가

  // 데이터 가져오기
  useEffect(() => {
    fetch("http://10.125.121.226:8080/boards")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="board-container">
      <h1 className="board-title">커뮤니티</h1>
      <div className="board-search">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="board-search-input"
        />
        <button className="board-search-button">검색</button>
        {/* 글쓰기 버튼 추가 */}
        <button
          className="board-write-button"
          onClick={() => navigate("/board/write")} // 글쓰기 페이지로 이동
        >
          글쓰기
        </button>
      </div>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>글제목</th>
            <th>닉네임</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/board/${post.id}`} className="board-link">
                  {post.title}
                </Link>
              </td>
              <td>{post.member.nickname}</td>
              <td>
                {post.createdDate
                  ? new Date(post.createdDate).toLocaleDateString()
                  : "날짜 없음"}
              </td>
              <td>{post.cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="board-pagination">
        <button className="board-pagination-button">이전</button>
        <span>1 page / 1 pages</span>
        <button className="board-pagination-button">다음</button>
      </div>
    </div>
  );
}

export default Board;
