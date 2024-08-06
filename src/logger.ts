import * as winston from "winston";

const level = process.env.NODE_ENV === "dev" ? "debug" : "info";

// Creating the log file

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ level }),
    new winston.transports.File({ filename: "apk-service.log" }),
  ],
});

logger.info("Logging level: " + level);
