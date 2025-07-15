// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import router from './routers/index.js';
// import { getEnvVar } from './utils/getEnvVar.js';
// import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import { errorHandler } from './middlewares/errorHandler.js';
// import cookieParser from 'cookie-parser';
// import { UPLOAD_DIR } from './constants/index.js';
// import dotenv from 'dotenv';
// import { swaggerDocs } from './middlewares/swaggerDocs.js';

// dotenv.config();

// const PORT = Number(process.env.PORT || getEnvVar('PORT', '3000'));

// export const setupServer = () => {
//     const app = express();

//     app.use(express.json());
//     app.use(cors());
//     app.use(cookieParser());
//     app.use(
//         pino({
//             transport: {
//                 target: 'pino-pretty',
//             },
//         }),
//     );
//     app.get('/', (req, res) => {
//         res.json({
//             message: 'Hello world!',
//         });
//     });
//     app.use('/uploads', express.static(UPLOAD_DIR));
//     app.use('/api-docs', swaggerDocs());

//     app.use(router);
//     app.use(notFoundHandler);
//     app.use(errorHandler);
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// };

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import dotenv from 'dotenv';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(process.env.PORT || getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));

  // 🛠 ВАЖЛИВО: Перевірка чи масив або функція
  const swagger = swaggerDocs();
  if (Array.isArray(swagger)) {
    app.use('/api-docs', ...swagger);
  } else {
    app.use('/api-docs', swagger); // Якщо сталася помилка читання swagger.json
  }

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
