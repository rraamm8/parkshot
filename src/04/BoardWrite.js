import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Board.css"; // 통합 CSS 파일

function BoardWrite() {
  const navigate = useNavigate();

  // 로컬 스토리지에서 닉네임 가져오기
  const nickname = localStorage.getItem("nickname");

  const [post, setPost] = useState({ title: "", content: "", member: { nickname: nickname || "" }, }); //닉네임 자동포함

  const handleSubmit = () => {
    fetch("http://10.125.121.226:8080/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          alert("게시글이 작성되었습니다!");
          navigate("/board");
        } else {
          return response.json().then((error) => {
            alert(`게시글 작성 실패: ${error.message}`);
          });
        }
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <div className="board-container">
      <h1 className="board-title">게시글 작성</h1>
      <div className="board-form">
        <input
          type="text"
          placeholder="제목"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="board-input"
        />
        <textarea
          placeholder="내용"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="board-textarea"
        ></textarea>
        <button onClick={handleSubmit} className="board-submit-button">
          등록
        </button>
      </div>
    </div>
  );
}

export default BoardWrite;