import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { router } from './routes/qrCodeRoutes';
import cors from 'cors';

const app = express();
app.use(cors());

dotenv.config();
app.use(bodyParser.json());
app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
