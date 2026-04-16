import { Request, Response } from 'express';
import Todo from '../models/todo.model';

export const getTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        return res.json(todos);
    } catch (error) {
        console.error('Get todos error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        return res.json(todo);
    } catch (error) {
        console.error('Get todo by ID error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, description, priority, dueDate, tasks, completed } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({ success: false, message: 'Title and dueDate are required' });
        }

        const todo = new Todo({
            title,
            description: description || '',
            priority: priority || 'medium',
            dueDate,
            tasks: tasks || [],
            completed: completed || false
        });

        await todo.save();
        return res.status(201).json({ success: true, message: 'Todo created successfully', id: todo._id });
    } catch (error) {
        console.error('Create todo error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate, tasks, completed } = req.body;

        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (priority !== undefined) todo.priority = priority;
        if (dueDate !== undefined) todo.dueDate = dueDate;
        if (tasks !== undefined) todo.tasks = tasks;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();
        return res.json(todo);
    } catch (error) {
        console.error('Update todo error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        return res.status(204).send();
    } catch (error) {
        console.error('Delete todo error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
