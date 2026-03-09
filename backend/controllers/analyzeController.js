import fs from 'fs';
import { extractTextFromPdf } from '../services/pdfService.js';
import { analyzeWithGemini } from '../services/geminiService.js';
import { ROLES } from '../utils/roleSkills.js';

/**
 * POST /api/analyze
 * multipart/form-data: { role, resume (file) }
 */
export const analyzeResume = async (req, res) => {
    const { role } = req.body;
    const file = req.file;

    if (!role || !file) {
        return res.status(400).json({ error: 'Both role and resume PDF are required.' });
    }
    if (!ROLES.includes(role)) {
        try { fs.unlinkSync(file.path); } catch (_) { }
        return res.status(400).json({ error: 'Invalid role selected.' });
    }

    try {
        const resumeText = await extractTextFromPdf(file.path);

        if (!resumeText || resumeText.trim().length < 50) {
            return res.status(422).json({ error: 'Could not extract text from PDF. Please upload a text-based PDF (not a scanned image).' });
        }

        const result = await analyzeWithGemini(role, resumeText);

        // Return resumeText so frontend can reuse it for role-switching
        res.json({ ok: true, resumeText, ...result });

    } catch (err) {
        console.error('[analyzeResume]', err.message);
        if (err.message === 'AI response could not be parsed') {
            return res.status(502).json({ error: 'AI response could not be parsed. Please try again.' });
        }
        res.status(500).json({ error: err.message || 'Internal server error' });
    } finally {
        if (file?.path) try { fs.unlinkSync(file.path); } catch (_) { }
    }
};

/**
 * POST /api/reanalyze
 * JSON body: { role, resumeText }
 * Re-runs analysis with a new role — no re-upload needed.
 */
export const reanalyzeResume = async (req, res) => {
    const { role, resumeText } = req.body;

    if (!role || !resumeText) {
        return res.status(400).json({ error: 'Both role and resumeText are required.' });
    }
    if (!ROLES.includes(role)) {
        return res.status(400).json({ error: 'Invalid role selected.' });
    }

    try {
        const result = await analyzeWithGemini(role, resumeText);
        res.json({ ok: true, resumeText, ...result });
    } catch (err) {
        console.error('[reanalyzeResume]', err.message);
        if (err.message === 'AI response could not be parsed') {
            return res.status(502).json({ error: 'AI response could not be parsed. Please try again.' });
        }
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};
