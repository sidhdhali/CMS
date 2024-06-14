import express from 'express';
import './db/server.js';
import contentRouter from './routes/contentsRouter.js';
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
const app = express()
const PORT = 8000

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'  // Allow only your frontend to access the backend
}));
app.use('/content', contentRouter);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))