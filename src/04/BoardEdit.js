import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardEdit() {
  const { id } = useParams(); // URL에서 게시글 ID 추출
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" }); // 제목과 내용 초기값 설정

  // 기존 게시글 데이터 가져오기
  useEffect(() => {
    fetch(`http://10.125.121.226:8080/boards/${id}`)
      .then((response) => response.json())
      .then((data) => setPost({ title: data.title, content: data.content }))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  const handleUpdate = () => {
    // 로컬 스토리지에서 member_id 가져오기
    const memberId = localStorage.getItem("username");

    if (!memberId) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      navigate("/login-input");
      return;
    }

    const requestData = {
      title: post.title,
      content: post.content,
      username: memberId, // 수정 시에도 member_id 포함
    };

    fetch(`http://10.125.121.226:8080/boards/${id}`, {
      method: "PUT", // 수정 요청
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          alert("게시글이 수정되었습니다!");
          navigate(`/board/${id}`); // 수정된 게시글 보기로 이동
        } else {
          return response.json().then((error) => {
            alert(`게시글 수정 실패: ${error.message}`);
          });
        }
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="w-4/5 mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-5 text-center">게시글 수정</h1>
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="제목"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="p-3 border border-gray-300 rounded-md text-base"
        />
        <textarea
          placeholder="내용"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="p-3 border border-gray-300 rounded-md text-base h-48 resize-none"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleUpdate}
            className="p-3 bg-blue-500 text-white rounded-md text-base hover:bg-blue-600"
          >
            수정
          </button>
          <button
            onClick={() => navigate(`/board/${id}`)}
            className="p-3 bg-gray-500 text-white rounded-md text-base hover:bg-gray-600"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardEdit;
