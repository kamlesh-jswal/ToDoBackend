import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use((_req, res) => res.status(404).json({ message: 'Not found any data' }));

export default app;

//mongodb+srv://kamleshglbitm_db_user:Kamlesh@123@cluster0.qq7gra6.mongodb.net/?appName=Cluster0