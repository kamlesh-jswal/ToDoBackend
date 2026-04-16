import { Router } from 'express';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/getAllTodos', authenticate, getTodos);
router.get('/:id', getTodoById);
router.post('/createTodo', createTodo);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

export default router;
