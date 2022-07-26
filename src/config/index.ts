import { config } from 'dotenv';

config({ path: `./src/config/.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, LOG_LEVEL, LOG_FORMAT, LOG_DIR, ORIGIN, HTTP_TIMEOUT_MS, AUTH_TIMEOUT_IN_MS } =
  process.env;
