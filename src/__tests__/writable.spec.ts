import { Writable } from "../";
// Utility function: writable
describe("Writable", () => {
  interface ExampleInterface {
    readonly prop1: string;
    prop2: number;
  }

  it("should remove readonly modifier from properties", () => {
    const writableObj: Writable<ExampleInterface> = {
      prop1: "value",
      prop2: 123,
    };

    writableObj.prop1 = "new value";
    writableObj.prop2 = 456;

    expect(writableObj.prop1).toBe("new value");
    expect(writableObj.prop2).toBe(456);
  });
});
