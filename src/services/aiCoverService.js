import axios from "axios";

// 프롬프트, 제목, 내용 등 원하는 정보로 AI 표지 생성 API 호출
export async function generateAICover({ title, content, prompt }) {
  const res = await axios.post("/api/v1/books/generate-cover", { title, content, prompt });
  return res.data.data.coverImageUrl; // 생성된 이미지 URL 반환
}