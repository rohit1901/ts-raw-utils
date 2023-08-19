import { Promisify } from "../";
describe("Promisify", () => {
  const mockAsyncFunction = jest
    .fn()
    .mockImplementation((arg: number, callback: (result: string) => void) => {
      callback(`Processed: ${arg}`);
    });

  it("should convert a callback-based function to a promise-based function", async () => {
    const callbackMock = jest.fn();
    const promisifiedFn = Promisify(mockAsyncFunction);
    const promise = promisifiedFn(123).then(callbackMock);

    await Promise.resolve(); // Resolve any pending microtasks

    expect(mockAsyncFunction).toHaveBeenCalledWith(123, expect.any(Function));

    await promise;

    expect(callbackMock).toHaveBeenCalledWith("Processed: 123");
  });
});
