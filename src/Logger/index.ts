export class Logger {
    private static isEnabled = true; // Flag to enable or disable logging

    static enableLogging() {
        Logger.isEnabled = true;
    }

    static disableLogging() {
        Logger.isEnabled = false;
    }

    static log(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.log(message, ...args);
        }
    }

    static info(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }

    static warn(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.warn(`[WARNING] ${message}`, ...args);
        }
    }

    static error(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }

    static debug(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }

    static trace(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.trace(`[TRACE] ${message}`, ...args);
        }
    }

    static fatal(message: string, ...args: any[]) {
        if (Logger.isEnabled) {
            console.error(`[FATAL] ${message}`, ...args);
        }
    }
}

// Example usage
// Logger.log("This is a regular log message.");
// Logger.info("This is an info message.");
// Logger.warn("This is a warning message.");
// Logger.error("This is an error message.");
// Logger.debug("This is a debug message.");
// Logger.trace("This is a trace message.");
// Logger.fatal("This is a fatal message.");
