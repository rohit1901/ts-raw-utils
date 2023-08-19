import { EnumValues } from "../";
// Utility function: enumValues
describe("EnumValues", () => {
  enum ExampleEnum {
    Value1 = "Value 1",
    Value2 = "Value 2",
    Value3 = "Value 3",
  }

  it("should return an array of enum values", () => {
    const values = EnumValues(ExampleEnum);
    expect(values).toEqual(["Value 1", "Value 2", "Value 3"]);
  });
});
