const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// API Key (수정 필요)
const API_KEY = "48875f6a42044c04a5de1ec542dc4b78";

app.use(cors());

app.get("/api", async (req, res) => {
    const { sigun = "", page = 1, size = 10 } = req.query;

    // 요청 URL 생성
    const API_URL = `https://openapi.gg.go.kr/ChildhouseKndrgrM?Key=${API_KEY}&Type=json&pIndex=${page}&pSize=${size}${sigun ? `&SIGUN_NM=${encodeURIComponent(sigun)}` : ""}`;
    console.log("API 호출 URL:", API_URL);

    try {
        // API 호출
        const response = await fetch(API_URL);
        const data = await response.json(); // JSON 형식으로 처리
        console.log("API 응답 데이터:", data);

        // 클라이언트로 응답 반환
        res.json(data);
    } catch (error) {
        console.error("API 호출 오류:", error.message);
        res.status(500).json({ error: "API 호출 중 오류 발생" });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`프록시 서버가 실행 중입니다: http://localhost:${PORT}`);
});
