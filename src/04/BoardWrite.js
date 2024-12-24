import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardWrite.css"; // 새롭게 만든 CSS 파일

function BoardWrite() {
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "" }); // 제목과 내용 초기값 설정

  const handleSubmit = () => {
    // 로컬 스토리지에서 member_id 가져오기
    const memberId = localStorage.getItem("member_id");
    console.log("Fetched member_id:", memberId); // 디버깅용 로그

    if (!memberId) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      navigate("/login-input"); // 로그인 페이지로 이동
      return;
    }

    const requestData = {
      title: post.title,
      content: post.content,
      member_id: memberId, // member_id 추가
    };

    fetch("http://10.125.121.226:8080/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
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
    <div className="board-write-container">
      <h1 className="board-write-title">게시글 작성</h1>
      <div className="board-write-form">
        <input
          type="text"
          placeholder="제목"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="board-write-input"
        />
        <textarea
          placeholder="내용"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="board-write-textarea"
        ></textarea>
        <button onClick={handleSubmit} className="board-write-submit-button">
          등록
        </button>
      </div>
    </div>
  );
}

export default BoardWrite;
