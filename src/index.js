import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', 3000));

const bootstrap = async () => {
    try {
        await initMongoConnection();
        setupServer(PORT);
    } catch (error) {
        console.error('❌ Failed to start app:', error);
        process.exit(1);
    }
};

bootstrap();
