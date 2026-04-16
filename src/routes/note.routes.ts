import { Router } from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/note.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getNotes);
router.get('/:id', authenticate, getNoteById);
router.post('/', authenticate, createNote);
router.put('/:id', authenticate, updateNote);
router.delete('/:id', authenticate, deleteNote);

export default router;