import React, { useState } from "react";
import {Box, TextField, Button, Typography, Paper, CircularProgress, Alert} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OpenAI from "openai";
import Layout from "../components/Layout";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function Register() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleGenerateCover = async () => {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 먼저 입력하세요.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const summaryPrompt = `
        아래 책 내용을 70자 이내로 요약해줘.
        제목: ${title}
        내용: ${content}
      `;
      const summaryRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: summaryPrompt }]
      });
      const summary = summaryRes.choices[0].message.content.trim();

      // 2. DALL·E 이미지 생성 프롬프트
      const imagePrompt = `
        "${title}"라는 제목을 표지 상단에 넣고,
        아래 요약에 어울리는 배경을 가진 책 앞표지 이미지를 만들어줘.
        요약: ${summary}
        `;

      const imageRes = await openai.images.generate({
        model: "dall-e-3",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024"
      });
      setCoverImageUrl(imageRes.data[0].url);
      setSuccess("AI 표지 이미지 생성 성공!");
    } catch (e) {
      setError("AI 표지 이미지 생성 실패");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력하세요.");
      return;
    }

    console.log("등록 데이터:", { title, content, coverImageUrl });

    try {
      const payload = { title, content };
      if (coverImageUrl?.trim()) {
        payload.coverImageUrl = coverImageUrl;
      }

      const res = await axios.post("/api/v1/books", payload);
      if (res.data.status === "success") {
        setSuccess("도서 등록 성공!");
        setTimeout(() => navigate("/books"), 1000);
      } else {
        setError(res.data.message || "도서 등록 실패");
      }
    } catch (e) {
      setError(
        e.response?.data?.message || "도서 등록 실패"
      );
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          mx: 'auto',
          mt: 5,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4
        }}
      >
        {/* 오른쪽 상단 뒤로가기 버튼 */}
        <Typography variant="h5" mb={3} textAlign="center">
          📘 도서 등록
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="outlined" onClick={() => navigate("/books")}>
            뒤로가기
          </Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* 표지 미리보기 */}
          <Box
            sx={{
              flex: '1 1 200px',
              maxWidth: 300,
              textAlign: 'center'
            }}
          >

            <Paper
              sx={{
                width: '100%',
                aspectRatio: '4/5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                mb: 2,
                overflow: 'hidden'
              }}
            >

              {loading ? (
                <CircularProgress />
              ) : coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt="표지"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <Typography color="textSecondary">표지 미리보기</Typography>
              )}
            </Paper>
          </Box>

          {/* 입력 폼 */}
          <Box sx={{ flex: '2 1 500px' }}>
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
              minRows={8}
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
    </Layout>
  );
}
