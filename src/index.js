// import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
// import { initMongoConnection } from './db/initMongoConnection.js';
// import { setupServer } from './server.js';
// import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
// import { getEnvVar } from './utils/getEnvVar.js';

// console.log('CLOUD_NAME =', getEnvVar('CLOUD_NAME'));

// const bootstrap = async () => {
//   await initMongoConnection();
//   await createDirIfNotExists(TEMP_UPLOAD_DIR);
//   await createDirIfNotExists(UPLOAD_DIR);
//   setupServer();
// };
// console.log('SMTP_USER:', process.env.SMTP_USER);
// console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'OK' : 'EMPTY or incorrect');
// void bootstrap();
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

void bootstrap();