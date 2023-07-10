interface ExtendedConsole extends Console {
    styledErrorWithStackTrace: (error: Error) => void;
    // Add any additional overridden methods or custom methods here
}

const extendedConsole: Partial<ExtendedConsole> = {
    log: (...args: any[]): void => {
        const formattedArgs = args.map(arg => `%c${arg}`).join(' ');
        const styles = 'color: blue; font-weight: bold;'; // Customize the styles as desired
        console.log(formattedArgs, styles);
    },
    error: (...args: any[]): void => {
        const error = args.find(arg => arg instanceof Error) as Error;
        const otherArgs = args.filter(arg => !(arg instanceof Error));
        const formattedArgs = otherArgs.map(arg => `%c${arg}`).join(' ');
        const styles = 'color: red; font-weight: bold;'; // Customize the styles as desired

        if (error) {
            console.groupCollapsed(formattedArgs, styles);
            console.error(`%c${error.stack}`, 'color: red;'); // Display the error stack trace
            console.groupEnd();
        } else {
            console.error(formattedArgs, styles);
        }
    },
    warn: (...args: any[]): void => {
        const formattedArgs = args.map(arg => `%c${arg}`).join(' ');
        const styles = 'color: orange; font-weight: bold;'; // Customize the styles as desired
        console.warn(formattedArgs, styles);
    },
    info: (...args: any[]): void => {
        const formattedArgs = args.map(arg => `%c${arg}`).join(' ');
        const styles = 'color: green; font-weight: bold;'; // Customize the styles as desired
        console.info(formattedArgs, styles);
    },
    debug: (...args: any[]): void => {
        const formattedArgs = args.map(arg => `%c${arg}`).join(' ');
        const styles = 'color: gray; font-weight: bold;'; // Customize the styles as desired
        console.debug(formattedArgs, styles);
    },
    styledErrorWithStackTrace: (error: Error): void => {
        // Custom implementation for styledErrorWithStackTrace
        // ...
    },
    // Add any additional overridden methods or custom methods here
};

export const customConsole = extendedConsole;

// Usage example
//customConsole.error(new Error('An error occurred.'));

// You can use `customConsole` as a replacement for the `console` object throughout your code.
