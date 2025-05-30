import React, { useState } from "react";
import { Button, Typography, CircularProgress, Alert } from "@mui/material";
import { RegisterContainer, PreviewPaper, FormBox, StyledTextField } from "./Register.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [loading, setLoading] = useState(false); // AI 이미지 생성 로딩
  const [error, setError] = useState("");        // 에러 메시지
  const [success, setSuccess] = useState("");    // 성공 메시지
  const navigate = useNavigate();

  // AI 표지 이미지 생성 함수
  const handleGenerateCover = async () => {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 먼저 입력하세요.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/books/generate-cover", { title, content });
      if (res.data.status === "success") {
        setCoverImageUrl(res.data.data.coverImageUrl);
        setSuccess("AI 표지 이미지 생성 성공!");
      } else {
        setError(res.data.message || "AI 표지 이미지 생성 실패");
      }
    } catch (e) {
      setError("AI 표지 이미지 생성 실패");
    }
    setLoading(false);
  };

  // 도서 등록 함수
  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력하세요.");
      return;
    }
    console.log({
        title,
        content,
        coverImageUrl
    });
    try {
    // coverImageUrl이 비어 있으면 payload에서 제외
    const payload = {
      title,
      content,
      //coverImageUrl
    };
    if (coverImageUrl && coverImageUrl.trim() !== "") {
      payload.coverImageUrl = coverImageUrl;
    }
    const res = await axios.post("/api/v1/books", payload);
    if (res.data.status === "success") {
      setSuccess("도서 등록 성공!");
      setTimeout(() => navigate("/books"), 1000); // 1초 후 목록으로 이동
    } else {
      setError(res.data.message || "도서 등록 실패");
    }
  } catch (e) {
    if (e.response && e.response.data && e.response.data.message) {
      setError(e.response.data.message);
    } else {
      setError("도서 등록 실패");
    }
  }
  };

  return (
    <RegisterContainer>
      <Typography variant="h5" mb={2}>도서 등록</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Box display="flex" gap={4}>
        <PreviewPaper>
          {loading ? (
            <CircularProgress />
          ) : coverImageUrl ? (
            <img src={coverImageUrl} alt="표지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Typography color="textSecondary">표지 미리보기</Typography>
          )}
        </PreviewPaper>
        <FormBox>
          <StyledTextField
            label="제목"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{ maxLength: 20 }}
            helperText={`${title.length}/20`}
            required
          />
          <StyledTextField
            label="내용"
            fullWidth
            multiline
            minRows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 500 }}
            helperText={`${content.length}/500`}
            required
          />
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={handleGenerateCover}
              disabled={loading || !title.trim() || !content.trim()}
            >
              {loading ? "생성 중..." : "AI 표지 이미지 생성"}
            </Button>
            <Button
              variant="contained"
              onClick={handleRegister}
              disabled={!title.trim() || !content.trim()}
            >
              등록
            </Button>
          </Box>
        </FormBox>
      </Box>
    </RegisterContainer>
  );
}