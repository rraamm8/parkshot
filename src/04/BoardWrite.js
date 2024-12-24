import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Board.css"; // 통합 CSS 파일

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
  
    // 백엔드에 보낼 데이터 생성
    const requestData = {
      title: post.title,
      content: post.content,
      memberId: memberId, // 백엔드에서 요구하는 필드 이름
    };
  
    console.log("Sending requestData:", requestData); // 디버깅용 로그
  
    fetch("http://10.125.121.226:8080/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // JSON 요청 본문에 데이터 포함
    })
      .then((response) => {
        if (response.ok) {
          alert("게시글이 작성되었습니다!");
          navigate("/board");
        } else {
          return response.json().then((error) => {
            console.error("Error response:", error); // 서버 응답 에러 로그
            alert(`게시글 작성 실패: ${error.message}`);
          });
        }
      })
      .catch((error) => console.error("Error creating post:", error)); // 네트워크 에러 로그
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
