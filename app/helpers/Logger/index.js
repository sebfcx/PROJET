/* eslint-disable max-len */
import { createLogger, format, transports } from 'winston';
import { logFilters } from './logFilters.js';

export const logMoment = {
  get dateAndTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const readableMonth = month < 10 ? `0${month}` : String(month);
    const readableDay = day < 10 ? `0${day}` : String(day);
    const readableHours = hours < 10 ? `0${hours}` : String(hours);
    const readableMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
    const readableSeconds = seconds < 10 ? `0${seconds}` : String(seconds);

    const formattedLogDate = `${year}-${readableMonth}-${readableDay} at ${readableHours}:${readableMinutes}:${readableSeconds}`;

    return formattedLogDate;
  },
};

export const Logger = createLogger({
  exitOnError: false,
  silent: false,
  transports: [
    new transports.File({
      level: 'info',
      dirname: 'logs',
      filename: 'info.log',
      format: format.combine(
        logFilters.infoFilter(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.File({
      level: 'warn',
      dirname: 'logs',
      filename: 'warning.log',
      format: format.combine(
        logFilters.warnFilter(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.File({
      level: 'error',
      dirname: 'logs',
      filename: 'error.log',
      format: format.combine(
        logFilters.errorFilter(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(
        logFilters.errorFilter(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.Console({
      level: 'warn',
      format: format.combine(
        logFilters.warnFilter(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(
        logFilters.infoFilter(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.Console({
      level: 'silly',
      format: format.combine(
        logFilters.sillyFilter(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.Console({
      level: 'verbose',
      format: format.combine(
        logFilters.verboseFilter(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(
        logFilters.debugFilter(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      dirname: 'logs',
      filename: 'exception.log',
      format: format.combine(
        format.splat(),
        format.simple(),
      ),
    }),
  ],
});
