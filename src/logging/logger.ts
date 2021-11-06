const { createLogger, format, transports } = require("winston");

export default function (className: string) {
  return createLogger({
    format: format.combine(
      /** add colored log levels */
      format.colorize(),
      /** tells winston to generate a timestamp when formatting logs */
      format.timestamp(),
      /** print stack trace as part of the log */
      format.errors({ stack: true }),
      /** custom log format. */
      format.printf(function customFormat({ level, message, timestamp, stack } : {
        level: string,
        message: any,
        timestamp: any,
        stack: any
      }) {
        return `[${className}] [${timestamp}][${level}] : ${stack || message}`;
      })
    ),
    transports: [new transports.Console()],
  });
}
