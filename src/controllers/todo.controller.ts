import { Request, Response } from 'express';
import Todo from '../models/todo.model';

export const getTodos = async (_req: Request, res: Response) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    console.log("Todos:", todos);
    return res.json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    return res.json(todo);
};

export const createTodo = async (req: Request, res: Response) => {
    console.log("Request body:", req.body);

    const { title, description, completed } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({ title, description, completed });
    await todo.save();
    return res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Not found' });

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    return res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    return res.status(204).send();
};
