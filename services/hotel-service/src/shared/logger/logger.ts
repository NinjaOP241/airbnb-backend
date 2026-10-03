import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { getCorrelationId } from "../context/async-context.js";

const logger = winston.createLogger({
  defaultMeta: { service: "hotel-service" },

  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...data }) => {
      const output = {
        level,
        message,
        timestamp,
        correlationId: getCorrelationId(),
        data,
      };

      return JSON.stringify(output);
    }),
  ),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: "logs/%DATE%-app.log", // log filename pattern
      datePattern: "YYYY-MM-DD", // date format used for %DATE%
      maxSize: "20m", // maximum size of each log file
      maxFiles: "14d", // how long old log files are retained
    }),
  ],
});

export default logger;
