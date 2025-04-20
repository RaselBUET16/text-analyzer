const winston = require('winston');

const Logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => {
            const { timestamp, level, message, ...meta } = info;
            return JSON.stringify({
                time: timestamp,
                level,
                msg: message,
                ...meta
            });
        })
    ),
    transports: [
        new winston.transports.Console({ level: process.env.LOG_LEVEL || 'debug' }),
        new winston.transports.File({ level: 'debug', filename: `${process.env.LOG_DIR}/console.log` })
    ],
    exitOnError: false
})

function formatLog(message) {
    if (message instanceof Error) {
        return JSON.stringify({
            name: message.name,
            message: message.message,
            stack: message.stack
        }, null, 2);
    }

    if (typeof(message) === 'object') {
        try {
            return JSON.stringify(message, null, 2);
        } catch {
            return '[Unserializable object]';
        }
    }
    
    return String(message);
}
function printDebug(message, meta = {}) {
    Logger.debug(formatLog(message), meta);
}

function printError(message, meta = {}) {
    Logger.error(formatLog(message), meta);
}

function printWarning(message, meta = {}) {
    Logger.warn(formatLog(message), meta);
}

function printInfo(message, meta = {}) {
    Logger.info(formatLog(message), meta);
}


module.exports = { printDebug, printError, printWarning, printInfo };