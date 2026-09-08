import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoute from './routes/dataRoute';
import apiRoute from './routes/apiRoute';
import authRoute from './routes/authRoute';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());

app.use('/api/v1', dataRoute);
app.use('/api/v1', apiRoute);
app.use('/api/v1/auth', authRoute);

app.listen(port, () => {
  console.log(`server up on port: ${port}`);
});

export default app;