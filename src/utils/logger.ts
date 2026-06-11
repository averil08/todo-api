import winston from "winston";
// 1. Removed MongoDB and Config imports that are no longer needed

const transports: winston.transport[] = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "error.log", level: "error" }),
  new winston.transports.File({ filename: "combined.log" }),
  // 2. Removed the winston.transports.MongoDB block entirely
];

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.json()
  ),
  transports,
});

export default logger;