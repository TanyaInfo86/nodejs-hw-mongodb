import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = (port) => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({ message: 'Hello world!' });
    });

    app.use('/contacts', contactsRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
};
