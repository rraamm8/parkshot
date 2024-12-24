import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Board.css"; // 통합 CSS 파일

function BoardView() {
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // 게시글 데이터 초기값

  // 데이터 가져오기
  useEffect(() => {
    fetch(`http://10.125.121.226:8080/boards/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  // 삭제 기능
  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      fetch(`http://10.125.121.226:8080/boards/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("게시글이 삭제되었습니다.");
            navigate("/board"); // 목록으로 이동
          } else {
            alert("게시글 삭제 실패");
          }
        })
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  // 수정 버튼 클릭
  const handleEdit = () => {
    navigate(`/board/edit/${id}`); // 수정 페이지로 이동
  };

  // 게시글 데이터가 없을 때
  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="board-container">
      <h1 className="board-title">게시글 보기</h1>
      <div className="board-view-content">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <div className="board-view-info">
          <p>작성자: {post.member.nickname}</p>
          <p>작성일: {new Date(post.createdDate).toLocaleDateString()}</p>
          <p>조회수: {post.cnt}</p>
        </div>
        <p className="board-view-text">{post.content}</p>
      </div>
      <div className="board-buttons">
        <button onClick={handleEdit} className="board-correct-button">
          수정
        </button>
        <button onClick={handleDelete} className="board-delete-button">
          삭제
        </button>
        <button
          onClick={() => navigate("/board")}
          className="board-list-button">
          목록
        </button>
      </div>
    </div>
  );
}

export default BoardView;
