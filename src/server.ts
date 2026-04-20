import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import config from './config';

const server = http.createServer(app);

const start = async () => {
    // ❗ Skip DB + server in CI environment
    if (process.env.NODE_ENV === "ci") {
        console.log("Running in CI mode - skipping DB connection and server start");
        return;
    }

    await connectDB();

    server.listen(config.port, () => {
        console.log(`My Server listening on port ${config.port}`);
    });
};

start().catch((err) => {
    console.error('Startup error:', err);
    process.exit(1);
});