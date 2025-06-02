프론트엔드
-----
담당자 : 김민지, 나기현, 이승준, 정한이

## 주요 기능
- 도서 목록 : 전체 도서 조회
- 도서 상세 : 도서 상세, 수정, 삭제 기능
- AI 이미지 생성: DALL·E API를 이용하여 도서 표지 이미지 생성
- 디자인 : Material UI 적용

## 기술 스택
 
| 종류 | 기술 |
|------|------|
| 프레임워크 | React + Vite |
| 디자인 | MUI (Material UI) |
| 라우팅 | React Router v6 |
| HTTP 통신 | Axios |
| 백엔드 통신 | Spring Boot|
| AI | OpenAI API (DALL·E) | 

## 디렉토리 구조
```
book-manager-frontend/
├── public/                         # 정적 파일
│   └── index.html
├── src/
│   ├── assets/                     # 정적 리소스 (이미지 등)
│   │   └── react.svg
│   ├── Book/                       # 도서 관련 페이지 컴포넌트
│   │   ├── BookList.css            # 도서 목록 페이지 css
│   │   ├── BookList.jsx            # 도서 목록 페이지
│   │   ├── Detail.jsx              # 도서 상세 페이지
│   │   ├── List.jsx                # 도서 목록 페이지 test용
│   │   ├── Register.jsx            # 도서 등록 페이지
│   │   └── Update.jsx              # 도서 수정 페이지
│   ├── components/                 # 공통 UI 컴포넌트
│   │   └── Layout.jsx
│   ├── services/                   # AI 관련 서비스 (API 연동 등)
│   │   └── aiCoverService.js       # dalle 테스트
│   ├── api.js                      # API 요청 처리
│   ├── App.css                     # 전체 스타일
│   ├── App.jsx                     # 메인 앱 컴포넌트
│   ├── index.css                   # 기본 스타일
│   ├── main.jsx                    # 앱 진입점
│   └── router.js                   # 라우팅 설정
├── .env                            # 환경 변수 설정
├── .gitignore                      # Git 제외 파일 설정
├── .gitignore_backup               # Gitignore 백업
├── eslint.config.js                # 린트 설정
├── index.html                      # 앱 루트 HTML
├── package.json                    # 의존성 및 명령어 설정
├── package-lock.json               # 의존성 lock
├── README.md                       # 프로젝트 설명서
```

---
 
## 페이지 상세 정보
### 도서 목록 (BookList.jsx)
- /book
- 메인페이지
- 이미지나 제목을 누르면 상세페이지로 이동
- 도서 추가 버튼을 누르면 도서 등록 페이지로 이동
![스크린샷 2025-06-02 155648](https://github.com/user-attachments/assets/2fbb1739-5469-438a-a4bd-78a5f9b2a42e)


### 도서 등록 (Register.jsx)
- /book/register
- 도서 제목과 내용 작성
- AI 표지 이미지 생성 버튼을 누르면 표지 이미지 생성 및 표지 확인 가능
- 표지 이미지까지 생성 되면 등록 버튼을 눌러 도서 등록하기
![스크린샷 2025-06-02 153733](https://github.com/user-attachments/assets/093e0d91-2741-46b0-bdfd-3d2fea2e5972)


### 도서 상세 (Detail.jsx)
- /book/details/{id}
- 수정 및 삭제 가능
- 표지, 제목, 작가, 내용 확인 가능
![스크린샷 2025-06-02 155659](https://github.com/user-attachments/assets/6167ab91-4be2-4313-9994-7b9850d786df)


### 도서 수정 (Update.jsx)
- /book/update/{id}
- 제목, 작가, 내용 수정 가능
![스크린샷 2025-06-02 155729](https://github.com/user-attachments/assets/d9bf873d-faf5-46bf-9c6e-18c254c08a23)
