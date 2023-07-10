type PromisifyFn<T extends (...args: any[]) => any> = (...args: Parameters<T>) => Promise<ReturnType<T>>;
export function Promisify<T extends (...args: any[]) => any>(fn: T): PromisifyFn<T> {
    return (...args: Parameters<T>) => {
        return new Promise<ReturnType<T>>((resolve, reject) => {
            const callback = (result: ReturnType<T>) => {
                resolve(result);
            };

            try {
                fn(...args, callback);
            } catch (error) {
                reject(error);
            }
        });
    };
}