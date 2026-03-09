# Skill Gap Analyzer

AI-powered resume analysis tool that helps professionals identify skill gaps against their target role and receive actionable improvement suggestions.

---

## 🎯 Project Overview

**Skill Gap Analyzer** is a simple, focused web application that:

1. Accepts your resume (PDF)
2. Analyzes it against your selected target role
3. Provides a detailed compatibility assessment with actionable insights

### Key Features

- 📊 **Compatibility Score**: Get a 0-100 score on how well your resume matches the role
- 🎯 **Skill Analysis**: See detected skills, missing skills, and resume strengths
- 💡 **Actionable Suggestions**: Receive specific, implementable improvement recommendations
- 🚀 **Career Guidance**: Get personalized career advice for your target role
- 🔄 **Quick Role Switching**: Change roles without re-uploading your resume

### Supported Roles

- Backend Developer
- Frontend Developer
- Full Stack Developer
- Machine Learning Engineer
- Data Scientist
- DevOps Engineer
- Cloud Engineer
- Mobile App Developer
- UI/UX Designer
- Cybersecurity Engineer

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (with modern glassmorphism design)
- **HTTP Client**: Axios
- **State Management**: React Hooks

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI**: Google Gemini API (generative AI)
- **PDF Processing**: pdf-parse
- **File Upload**: Multer

### No Dependencies On

- ❌ Authentication/Login system
- ❌ Database (MongoDB/SQL)
- ❌ Python or other backend languages

---

## 📁 Project Structure

```
Skill-Gap-Analyzer/
├── backend/
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── routes/
│   │   └── analyzeRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── pdfService.js
│   ├── utils/
│   │   └── roleSkills.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RoleSelector.jsx
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── ScoreCard.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   └── Suggestions.jsx
│   │   ├── pages/
│   │   │   └── Analyzer.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Google Gemini API Key (free at [aistudio.google.com](https://aistudio.google.com/apikey))

### Installation & Setup

#### 1. Clone the repository

```bash
git clone <repository-url>
cd Skill-Gap-Analyzer
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your GEMINI_API_KEY
# (Get it from https://aistudio.google.com/apikey)
```

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# .env is already optional (defaults to http://localhost:5000)
# But you can create one if needed
cp .env.example .env
```

---

## 🏃 Running the Project

### Start the Backend

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Building for Production

**Frontend:**

```bash
cd frontend
npm run build
# Output in frontend/dist
```

**Backend:**
No build step needed. Just ensure Node.js dependencies are installed.

---

## 🔗 API Endpoints

### POST `/api/analyze`

**Analyze resume against a role**

**Request** (multipart/form-data):

```
role: string
resume: File (PDF)
```

**Response**:

```json
{
  "ok": true,
  "resumeText": "extracted text...",
  "role": "Backend Developer",
  "compatibility_score": 75,
  "summary": "...",
  "skills_detected": ["Node.js", "Express", "..."],
  "missing_skills": ["Docker", "..."],
  "resume_strengths": ["..."],
  "improvement_suggestions": ["..."],
  "career_guidance": "..."
}
```

### POST `/api/reanalyze`

**Re-analyze cached resume with a different role**

**Request** (JSON):

```json
{
  "role": "Frontend Developer",
  "resumeText": "previously extracted text..."
}
```

**Response**: Same as `/api/analyze`

---

## 📋 Environment Variables

### Backend (backend/.env)

```
GEMINI_API_KEY=your_key_here
PORT=5000
```

### Frontend (frontend/.env)

```
VITE_API_URL=http://localhost:5000
```

---

## 🤖 How It Works

1. **User uploads resume** (PDF format)
2. **Backend parses PDF** using pdf-parse
3. **Text sent to Google Gemini API** with structured prompt
4. **Gemini analyzes resume** against selected role
5. **JSON response extracted** safely (handles markdown/extra text)
6. **Frontend displays results** with visualizations
7. **User can switch roles** without re-uploading

### Gemini Analysis Prompt

The backend sends a carefully crafted prompt to Gemini:

```
You are an expert technical recruiter.
Evaluate the following resume against the role...
Return ONLY valid JSON with this structure:
{
  "role": "",
  "compatibility_score": 0-100,
  "summary": "",
  "skills_detected": [],
  "missing_skills": [],
  "resume_strengths": [],
  "improvement_suggestions": [],
  "career_guidance": ""
}
```

---

## ✨ Features Highlights

### 1. No Re-upload on Role Change

- Resume text is cached in the frontend
- Switching roles triggers `/api/reanalyze` (faster)
- No file upload needed for subsequent analyses

### 2. Smart PDF Handling

- Supports text-based PDFs
- Validates file size (max 5MB)
- Deletes uploaded file after processing (security)
- Error handling for scanned images

### 3. AI-Powered Analysis

- Uses Google Gemini (free tier available)
- Structured JSON responses
- Handles Gemini formatting quirks (markdown, extra text)
- Robust error handling

### 4. Modern UI/UX

- Dark glassmorphism design
- Responsive on mobile, tablet, desktop
- Real-time feedback (loading states)
- Smooth animations

### 5. Clean Architecture

- MVC pattern (controllers, services, routes)
- Separation of concerns
- Modular components
- Easy to extend

---

## 📝 Example Workflow

1. Visit the app → Select **Backend Developer**
2. Upload your resume (PDF)
3. Click **Analyze Resume**
4. View results:
   - **72% Compatibility Score**
   - **Detected:** Node.js, Express, MongoDB
   - **Missing:** Docker, Kubernetes, AWS
   - **Suggestions:** Learn containerization, add Docker project to portfolio
   - **Guidance:** Focus on DevOps fundamentals while strengthening backend skills
5. Switch to **Full Stack Developer** role
6. See updated analysis (no re-upload!)

---

## 🔒 Security & Best Practices

- ✅ Environment variables for API keys
- ✅ PDF files deleted after processing
- ✅ CORS enabled for frontend requests
- ✅ File size limits enforced
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak sensitive info

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not set"

- Add `GEMINI_API_KEY` to `backend/.env`
- Get it from [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### "Could not extract text from PDF"

- Ensure PDF is text-based (not a scanned image)
- PDFs with embedded text should work

### "AI response could not be parsed"

- Gemini occasionally returns unexpected format
- Retry the analysis
- Check backend logs for details

### Frontend can't reach backend

- Ensure backend is running on `http://localhost:5000`
- Check `frontend/.env` `VITE_API_URL`
- Check browser console for CORS errors

---

## 📦 Dependencies

### Backend

- `@google/generative-ai`: Gemini API integration
- `express`: Web framework
- `cors`: Enable cross-origin requests
- `multer`: File upload handling
- `pdf-parse`: PDF text extraction
- `dotenv`: Environment variable management
- `nodemon`: Dev server with auto-reload

### Frontend

- `react`: UI library
- `react-dom`: React DOM rendering
- `axios`: HTTP client
- `@tailwindcss/vite`: Tailwind CSS integration

---

## 🎓 Learning Resources

- [Google Gemini API Docs](https://ai.google.dev)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

---

## 📄 License

MIT License - feel free to use and modify

---

## 🤝 Contributing

Issues and PRs welcome! To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Support

For questions or issues, please open a GitHub issue or contact the maintainer.

---

**Built with ❤️ for career growth**
