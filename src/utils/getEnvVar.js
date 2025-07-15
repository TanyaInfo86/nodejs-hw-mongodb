import dotenv from 'dotenv';
dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name] || defaultValue;

  if (typeof value === 'undefined') {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};
