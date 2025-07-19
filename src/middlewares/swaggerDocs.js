import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';
import createHttpError from 'http-errors';

export const swaggerDocs = () => {
  try {
    const raw = fs.readFileSync(SWAGGER_PATH, 'utf-8');
    const swaggerDoc = JSON.parse(raw);
    return [swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (error) {
    console.error('Failed to load Swagger docs:', error.message);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
