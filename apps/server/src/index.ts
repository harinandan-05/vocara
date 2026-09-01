import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoute from './routes/dataRoute';
import apiRoute from './routes/apiRoute';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.use('/api/v1', dataRoute);
app.use('/api/v1', apiRoute);

app.listen(port, () => {
  console.log(`server up on port: ${port}`);
});

export default app;