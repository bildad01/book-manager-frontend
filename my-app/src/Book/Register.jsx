
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OpenAI from "openai";
import { registerBook } from '../api';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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
      // 1. GPT에게 70자 이내 요약 요청
      const summaryPrompt = `
        아래 책 내용을 70자 이내로 요약해줘.
        제목: ${title}
        내용: ${content}
        `;
      const summaryRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: summaryPrompt }],
      });
      const summary = summaryRes.choices[0].message.content.trim();

      // 2. DALL·E 이미지 생성 프롬프트
      const imagePrompt = `
        "${title}"라는 제목을 표지 상단에 넣고,
        아래 요약에 어울리는 배경을 가진 180x260 사이즈의 책 표지 이미지를 만들어줘.
        요약: ${summary}
        `;

      // 3. DALL·E로 이미지 생성
      const imageRes = await openai.images.generate({
        model: "dall-e-3",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024", // DALL·E 지원 사이즈 중 가장 비슷한 값
      });
      setCoverImageUrl(imageRes.data[0].url);
      setSuccess("AI 표지 이미지 생성 성공!");
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
    try {
      const payload = { title, content };
      if (coverImageUrl && coverImageUrl.trim() !== "") {
        payload.coverImageUrl = coverImageUrl;
      }
      const res = await registerBook(payload);
      // 서버 응답 구조에 따라 조건문 조정
      if (res.bookId) {
        setSuccess("도서 등록 성공!");
        setTimeout(() => navigate("/books"), 1000);
      } else {
        setError(res.message || "도서 등록 실패");
      }
    } catch (e) {
      setError(e.message || "도서 등록 실패");
    }
  };


  return (
    <Box
      maxWidth={700}
      width="100%"
      mx="auto"
      mt={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        도서 등록
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Box
        display="flex"
        gap={4}
        justifyContent="center"
        width="100%"
        alignItems="flex-start"
      >
        {/* 표지 미리보기 */}
        <Paper
          sx={{
            width: 180,
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            background: "#f5f5f5",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="표지"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                background: "#f5f5f5",
                display: "block",
              }}
            />
          ) : (
            <Typography color="textSecondary">표지 미리보기</Typography>
          )}
        </Paper>
        <Box flex={1}>
          <TextField
            label="제목"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{ maxLength: 20 }}
            helperText={`${title.length}/20`}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            minRows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 500 }}
            helperText={`${content.length}/500`}
            required
            sx={{ mb: 2 }}
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
        </Box>
      </Box>
    </Box>
  );
}