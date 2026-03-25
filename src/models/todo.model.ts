import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
    {
        title: { type: String, required: true, trim: true, maxlength: 120 },
        description: { type: String, trim: true, default: '' },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;
