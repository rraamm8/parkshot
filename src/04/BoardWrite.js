import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "" }); // 제목과 내용 초기값 설정

  const handleSubmit = async () => {
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
    };

    try {
      const response = await fetch(
        `http://10.125.121.226:8080/boards?memberId=${memberId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log("Response status:", response.status);
      if (response.ok) {
        alert("게시글이 작성되었습니다!");
        navigate("/board");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`게시글 작성 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-4/5 mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-5 text-center">게시글 작성</h1>
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
        <button
          onClick={handleSubmit}
          className="p-3 bg-blue-500 text-white rounded-md text-base hover:bg-blue-600"
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default BoardWrite;
