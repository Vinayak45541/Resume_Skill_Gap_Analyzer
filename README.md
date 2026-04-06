# 🚀 Resume Skill Gap Analyzer

Skill Gap Analyzer is a role-based resume analysis web application that evaluates how well a resume matches a selected technical role. The system extracts resume content, sends it to an AI model, and returns structured feedback including compatibility score, detected skills, missing skills, and improvement suggestions.

---

# 🛠 Tech Stack

## Frontend

* **React** — UI development
* **Vite** — Build tool and development server
* **Tailwind CSS** — Styling and layout
* **Axios** — API communication

Frontend responsibilities:

* Role selection interface
* Resume upload handling
* Sending API requests
* Displaying structured analysis results
* Caching extracted resume text for re-analysis

---

## Backend

* **Node.js** — Runtime environment
* **Express.js** — REST API server
* **Google Gemini API** — Resume analysis
* **Multer** — File upload handling
* **pdf-parse** — PDF text extraction
* **dotenv** — Environment configuration

Backend responsibilities:

* Handling file uploads
* Extracting resume text
* Constructing AI prompts
* Calling Gemini API
* Parsing AI responses
* Returning structured JSON

---

# 🏗 System Architecture

The application follows a **client-server architecture**.

```
Frontend (React)
        │
        │ HTTP Requests
        ▼
Backend (Express API)
        │
        │ File Processing
        ▼
PDF Text Extraction (pdf-parse)
        │
        │ Resume Text
        ▼
Gemini AI API
        │
        │ Structured Response
        ▼
Frontend UI Rendering
```

Each layer performs a specific function and communicates through defined interfaces.

---

# 📁 Backend Architecture

The backend is structured into modular layers to separate responsibilities.

```
backend
│
├── controllers
│   analyzeController.js
│
├── routes
│   analyzeRoutes.js
│
├── services
│   geminiService.js
│   pdfService.js
│
├── utils
│   roleSkills.js
│
├── uploads
│
└── server.js
```

## controllers/

Handles incoming requests and coordinates processing steps.

Responsibilities:

* Validate input data
* Receive uploaded files
* Call service functions
* Send formatted responses

---

## routes/

Defines API endpoints and connects them to controllers.

Example:

* `/api/analyze`
* `/api/reanalyze`

---

## services/

Contains reusable logic.

### geminiService.js

Responsible for:

* Creating AI prompts
* Sending requests to Gemini
* Receiving model responses
* Extracting valid JSON output

---

### pdfService.js

Responsible for:

* Reading uploaded PDF files
* Extracting text using pdf-parse
* Returning extracted content

---

## utils/

Contains reusable configuration data.

### roleSkills.js

Defines supported roles and expected skills.

Used to:

* Validate role input
* Provide role-specific context to AI

---

## uploads/

Temporary storage for uploaded PDF files.

Files are deleted after processing.

---

## server.js

Initializes Express application.

Responsibilities:

* Configure middleware
* Enable CORS
* Register routes
* Start server

---

# 📁 Frontend Architecture

```
frontend
│
├── components
│
├── pages
│   Analyzer.jsx
│
├── services
│   api.js
│
└── App.jsx
```

## components/

Reusable UI blocks.

Examples:

* Role selector
* File uploader
* Score display
* Skills list
* Suggestions list

---

## pages/

Contains page-level logic.

### Analyzer.jsx

Responsible for:

* Managing role selection
* Handling file uploads
* Storing extracted resume text
* Triggering re-analysis
* Rendering results

---

## services/

Contains API communication logic.

### api.js

Responsible for:

* Sending HTTP requests
* Handling responses
* Managing API endpoints

---

# 🔄 Application Workflow

## Initial Resume Analysis

Step-by-step execution:

1. User selects a role.
2. User uploads resume file.
3. Frontend sends request to `/api/analyze`.
4. Backend receives file using Multer.
5. PDF text is extracted using pdf-parse.
6. Resume text and role are sent to Gemini.
7. Gemini evaluates compatibility.
8. JSON response is returned.
9. Backend sends structured result.
10. Frontend renders analysis results.

---

## Role Re-analysis Workflow

This avoids re-uploading the same file.

Steps:

1. Resume text is stored in frontend state.
2. User selects another role.
3. Request is sent to `/api/reanalyze`.
4. Resume text is reused.
5. Gemini performs new evaluation.
6. Updated results are displayed.

---

# 🤖 AI Processing Logic

The Gemini model receives:

* Target role
* Resume text

The model evaluates:

* Skill alignment
* Experience relevance
* Technology coverage
* Missing competencies

Expected structured output:

```
{
  role,
  compatibility_score,
  summary,
  skills_detected,
  missing_skills,
  resume_strengths,
  improvement_suggestions,
  career_guidance
}
```

The backend validates and parses this output before sending it to the frontend.

---

# 📊 Compatibility Score Logic

The compatibility score estimates how closely the resume matches the selected role.

Score interpretation:

| Score Range | Meaning               |
| ----------- | --------------------- |
| 90–100      | Strong role alignment |
| 75–89       | Minor skill gaps      |
| 60–74       | Moderate gaps         |
| 40–59       | Significant gaps      |
| Below 40    | Weak alignment        |

This score is generated by the AI model based on detected and missing signals.

---

# 🔑 Environment Configuration

Backend `.env`

```
GEMINI_API_KEY=your_api_key
PORT=5000
```

Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

Environment variables are used to avoid hardcoding sensitive information.

---

# ⚠️ System Limitations

* Only text-based PDFs are supported
* No resume storage or history tracking
* AI output depends on resume clarity
* Internet connection required for AI processing

---

# 🚧 Possible Enhancements

Future improvements may include:

* Resume export as PDF report
* ATS scoring module
* Skill learning recommendations
* Resume rewriting assistance
* Deployment to cloud platform
