# 🚀 Skill Gap Analyzer

Skill Gap Analyzer is a web application that analyzes a resume against a selected technical role and provides structured feedback.

The system uses an AI model to evaluate role compatibility and returns a score, detected skills, missing skills, and actionable improvement suggestions.

---

## ✨ Features

* 📄 Upload a resume (PDF)
* 🎯 Select a target role
* 📊 Compatibility score (0–100)
* 🧠 Detected skills and missing skills
* 💡 Resume improvement suggestions
* 🚀 Career guidance
* 🔄 Role switching without re-uploading the resume

### Supported Roles

* Backend Developer
* Frontend Developer
* Full Stack Developer
* Machine Learning Engineer
* Data Scientist
* DevOps Engineer
* Cloud Engineer
* Mobile App Developer
* UI/UX Designer
* Cybersecurity Engineer

---

## 🛠 Tech Stack

**Frontend**

* React
* Vite
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* Google Gemini API

**Utilities**

* pdf-parse — PDF text extraction
* multer — file upload handling
* dotenv — environment variables

The project does not use authentication or a database.

---

## 📁 Project Structure

```
Skill-Gap-Analyzer
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── services
│   └── index.html
│
└── README.md
```

---

## 🔑 Environment Variables

Backend `.env`

```
GEMINI_API_KEY=your_api_key
PORT=5000
```

Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

---
## ⚙️ Setup & Run

Clone the repository and install dependencies.

```
git clone https://github.com/Vinayak45541/Skill-Gap-Analyzer.git
cd Skill-Gap-Analyzer

# install backend dependencies
cd backend
npm install

# install frontend dependencies
cd ../frontend
npm install
```

Start the servers.

```
# start backend
cd backend
npm run dev

# start frontend
cd ../frontend
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### 📄 POST `/api/analyze`

Upload resume and analyze it against a selected role.

```
role: string
resume: PDF
```

---

### 🔄 POST `/api/reanalyze`

Analyze the same resume for another role without uploading again.

```
{
  "role": "Full Stack Developer",
  "resumeText": "previously extracted text"
}
```

---

## 🔍 Workflow

1. User selects a role.
2. User uploads a resume.
3. Backend extracts text from the PDF.
4. Resume text is analyzed using Gemini.
5. Structured analysis is returned and displayed.
6. The user can switch roles and reanalyze instantly.

---

## 📜 License

MIT License
