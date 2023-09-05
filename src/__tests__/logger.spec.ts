import {Logger} from "../Logger";

describe('Logger', () => {
    let consoleLogSpy: jest.SpyInstance;
    let consoleInfoSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;
    let consoleDebugSpy: jest.SpyInstance;
    let consoleTraceSpy: jest.SpyInstance;
    let consoleFatalSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log to do nothing
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {}); // Mock console.info to do nothing
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}); // Mock console.warn to do nothing
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error to do nothing
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {}); // Mock console.debug to do nothing
        consoleTraceSpy = jest.spyOn(console, 'trace').mockImplementation(() => {}); // Mock console.trace to do nothing
        consoleFatalSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.fatal to do nothing

        Logger.enableLogging(); // Ensure logging is enabled before each test
    });

    afterEach(() => {
        consoleLogSpy.mockRestore(); // Restore the original console.log
        consoleInfoSpy.mockRestore(); // Restore the original console.info
        consoleWarnSpy.mockRestore(); // Restore the original console.warn
        consoleErrorSpy.mockRestore(); // Restore the original console.error
        consoleDebugSpy.mockRestore(); // Restore the original console.debug
        consoleTraceSpy.mockRestore(); // Restore the original console.trace
        consoleFatalSpy.mockRestore(); // Restore the original console.fatal
    });

    it('should log when logging is enabled', () => {
        Logger.log('Test message');
        expect(consoleLogSpy).toHaveBeenCalledWith('Test message');
    });

    it('should not log when logging is disabled', () => {
        Logger.disableLogging();
        Logger.log('Test message');
        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
    it('should log info when logging is enabled', function () {
        Logger.info('Test message');
        expect(consoleInfoSpy).toHaveBeenCalledWith('[INFO] Test message');
    });
    it('should not log info when logging is disabled', function () {
        Logger.disableLogging();
        Logger.info('Test message');
        expect(consoleInfoSpy).not.toHaveBeenCalled();
    });
    it('should log warn when logging is enabled', function () {
        Logger.warn('Test message');
        expect(consoleWarnSpy).toHaveBeenCalledWith('[WARNING] Test message');
    });
    it('should not log warn when logging is disabled', function () {
        Logger.disableLogging();
        Logger.warn('Test message');
        expect(consoleWarnSpy).not.toHaveBeenCalled();
    }   );
    it('should log error when logging is enabled', function () {
        Logger.error('Test message');
        expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] Test message');
    });
    it('should not log error when logging is disabled', function () {
        Logger.disableLogging();
        Logger.error('Test message');
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    }   );
    it('should log debug when logging is enabled', function () {
        Logger.debug('Test message');
        expect(consoleDebugSpy).toHaveBeenCalledWith('[DEBUG] Test message');
    }   );
    it('should not log debug when logging is disabled', function () {
        Logger.disableLogging();
        Logger.debug('Test message');
        expect(consoleDebugSpy).not.toHaveBeenCalled();
    }   );
    it('should log trace when logging is enabled', function () {
        Logger.trace('Test message');
        expect(consoleTraceSpy).toHaveBeenCalledWith('[TRACE] Test message');
    }   );
    it('should not log trace when logging is disabled', function () {
        Logger.disableLogging();
        Logger.trace('Test message');
        expect(consoleTraceSpy).not.toHaveBeenCalled();
    }   );
    it('should log fatal when logging is enabled', function () {
        Logger.fatal('Test message');
        expect(consoleFatalSpy).toHaveBeenCalledWith('[FATAL] Test message');
    }   );
    it('should not log fatal when logging is disabled', function () {
        Logger.disableLogging();
        Logger.fatal('Test message');
        expect(consoleFatalSpy).not.toHaveBeenCalled();
    }   );
});