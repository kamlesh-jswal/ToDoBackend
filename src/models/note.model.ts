import { Schema, model, Document } from 'mongoose';

export interface INote extends Document {
    title: string;
    detail?: string;
    noteColor: string;
    createdAt: string;
    updatedAt: string;
}

const NoteSchema = new Schema<INote>(
    {
        title: { type: String, required: true, trim: true, maxlength: 200 },
        detail: { type: String, trim: true },
        noteColor: { type: String, required: true },
        createdAt: { type: String, required: true },
        updatedAt: { type: String, required: true },
    },
    { timestamps: false } // We'll handle timestamps manually as strings
);

const Note = model<INote>('Note', NoteSchema);

export default Note;