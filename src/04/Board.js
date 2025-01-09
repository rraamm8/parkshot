import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Board.css";

function Board() {
  const [posts, setPosts] = useState([]); // 게시글 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const postsPerPage = 10; // 페이지당 게시글 수
  const navigate = useNavigate(); // 글쓰기 버튼을 위한 네비게이션 추가

  // 데이터 가져오기
  const fetchPosts = (page) => {
    fetch(
      `http://10.125.121.226:8080/boards?page=${page}&size=${postsPerPage}&sortBy=id&sortDirection=desc`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.content || []); // content 배열에 게시글 저장
        setTotalPages(data.totalPages || 1); // 총 페이지 수 설정
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  useEffect(() => {
    fetchPosts(currentPage); // 현재 페이지 데이터를 가져옵니다.
  }, [currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="board-container">
      <h1 className="board-title p-4">커뮤니티</h1>
      <div className="board-search">
        {/* 글쓰기 버튼 */}
        <button
          className="board-write-button"
          onClick={() => navigate("/board/write")}
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
              <td>{index + 1 + (currentPage - 1) * postsPerPage}</td>
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
        {/* 이전 버튼 */}
        <button
          className="board-pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

        {/* 페이지 번호 표시 */}
        <span>
          {currentPage} page / {totalPages} pages
        </span>

        {/* 다음 버튼 */}
        <button
          className="board-pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Board;
