import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mainRouter from './routes/index.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(mainRouter);

export default app;
