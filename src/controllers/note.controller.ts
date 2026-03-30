import { Request, Response } from 'express';
import Note from '../models/note.model';

export const getNotes = async (_req: Request, res: Response) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        return res.json(notes);
    } catch (error) {
        console.error('Get notes error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getNoteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        return res.json(note);
    } catch (error) {
        console.error('Get note by ID error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, detail, date, noteColor } = req.body;

        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date are required' });
        }

        const currentDate = new Date().toISOString();
        const note = new Note({
            title,
            detail: detail || '',
            noteColor: noteColor || '#FFE66D',
            createdAt: date,
            updatedAt: date
        });

        await note.save();
        return res.status(201).json(note);
    } catch (error) {
        console.error('Create note error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, detail, date, noteColor } = req.body;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (title !== undefined) note.title = title;
        if (detail !== undefined) note.detail = detail;
        if (noteColor !== undefined) note.noteColor = noteColor;

        note.updatedAt = date;

        await note.save();
        return res.json(note);
    } catch (error) {
        console.error('Update note error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        return res.status(204).send();
    } catch (error) {
        console.error('Delete note error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};