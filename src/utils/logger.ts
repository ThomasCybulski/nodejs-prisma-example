import { LOG_DIR, LOG_LEVEL } from '@config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const logDir: string = join(__dirname, LOG_DIR as string);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.log',
      maxFiles: 14, // 14 Days saved
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    level: LOG_LEVEL,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize({
        all: false,
      }),
      logFormat,
    ),
  }),
);

winston.addColors({
  info: 'bold blue',
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green',
});

const stream = {
  write: (message: string) => {
    logger.debug(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
