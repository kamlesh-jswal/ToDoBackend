import { Schema, model, Document } from 'mongoose';

export interface ITask {
    id: string;
    title: string;
    completed: boolean;
}

export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
    tasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false }
}, { _id: false });

const TodoSchema = new Schema<ITodo>(
    {
        title: { type: String, required: true, trim: true, maxlength: 120 },
        description: { type: String, trim: true, default: '' },
        completed: { type: Boolean, default: false },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        dueDate: { type: Date, required: true },
        tasks: [TaskSchema],
    },
    { timestamps: true }
);

const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;
