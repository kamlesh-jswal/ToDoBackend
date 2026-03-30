import { Router } from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/note.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;