import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.json';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Sirve Swagger UI en /api/docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api', routes);

// Manejador de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`StyleHub backend listening on port ${PORT}`);
});