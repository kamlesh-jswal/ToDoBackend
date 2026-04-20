import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes';

const app = express();
console.log("Hello from CI 🚀");
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notes', noteRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use((_req, res) => res.status(404).json({ message: 'Not found any data' }));

export default app;

//mongodb+srv://kamleshglbitm_db_user:Kamlesh@123@cluster0.qq7gra6.mongodb.net/?appName=Cluster0