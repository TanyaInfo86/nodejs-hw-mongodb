// import swaggerUI from 'swagger-ui-express';
// import fs from 'node:fs';
// import { SWAGGER_PATH } from '../constants/index.js';
// import createHttpError from 'http-errors';


// export const swaggerDocs = () => {
//   try {
//     const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
//     return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
//   } catch {
//     return (req, res, next) =>
//       next(createHttpError(500, "Can't load swagger docs"));
//   }
// };
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';
import createHttpError from 'http-errors';

let swaggerMiddleware;

try {
  const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf-8'));
  swaggerMiddleware = [swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
} catch (error) {
  console.error('❌ Failed to load Swagger docs:', error.message);
  swaggerMiddleware = [
    (req, res, next) => next(createHttpError(500, "Can't load Swagger docs")),
  ];
}

export const swaggerDocs = () => swaggerMiddleware;
