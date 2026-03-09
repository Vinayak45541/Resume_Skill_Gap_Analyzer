import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeResume, reanalyzeResume } from '../controllers/analyzeController.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (_req, _file, cb) => cb(null, `resume-${Date.now()}.pdf`),
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        file.mimetype === 'application/pdf'
            ? cb(null, true)
            : cb(new Error('Only PDF files are allowed'));
    },
});

router.post('/analyze', upload.single('resume'), analyzeResume);
router.post('/reanalyze', reanalyzeResume);

export default router;
