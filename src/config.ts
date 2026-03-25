import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 4000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db',
};

export default config;
