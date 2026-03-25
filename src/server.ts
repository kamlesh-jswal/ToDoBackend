import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import config from './config';

const server = http.createServer(app);
console.log("ENV CHECK:", process.env.MONGODB_URI);
const start = async () => {
    await connectDB();

    server.listen(config.port, () => {
        console.log(`My Server listening on port ${config.port}`);
    });
};

start().catch((err) => {
    console.error('Startup error:', err);
    process.exit(1);
});
