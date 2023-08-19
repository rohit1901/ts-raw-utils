import { DeepPartial } from "../";
// Utility function: DeepPartial
describe("DeepPartial", () => {
  interface ExampleNestedInterface {
    prop1: string;
    prop2: number;
  }

  interface ExampleInterface {
    nested: ExampleNestedInterface;
    prop3: boolean;
  }

  it("should make all properties of a nested object optional", () => {
    const partialObj: DeepPartial<ExampleInterface> = {
      nested: {
        prop1: "value",
      } as ExampleNestedInterface,
    };

    expect(partialObj.nested?.prop1).toBe("value");
    expect(partialObj.nested?.prop2).toBeUndefined();
    expect(partialObj.prop3).toBeUndefined();
  });
});
