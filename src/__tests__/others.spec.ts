import {
  deepMerge,
  serialize,
  deserialize,
  chunkArray,
  shuffleArray,
  uniqueArray,
  flattenArray,
  filterFalsy,
  formatNumber,
  pluralize,
  truncateString,
  validateEmail,
} from "../";

describe("serialize and deserialize", () => {
  it("should serialize and deserialize an object", () => {
    const obj = { name: "John", age: 30 };
    const serialized = serialize(obj);
    const deserialized = deserialize(serialized);
    expect(deserialized).toEqual(obj);
  });
});

describe("chunkArray", () => {
  it("should split an array into chunks of specified size", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const chunks = chunkArray(arr, 3);
    expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });
});

describe("shuffleArray", () => {
  it("should shuffle the elements of an array", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled).not.toEqual(arr);
    expect(shuffled).toHaveLength(arr.length);
    expect(shuffled).toEqual(expect.arrayContaining(arr));
  });
});

describe("uniqueArray", () => {
  it("should remove duplicate elements from an array", () => {
    const arr = [1, 2, 2, 3, 4, 4, 5];
    const unique = uniqueArray(arr);
    expect(unique).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("filterFalsy", () => {
  it("should filter out falsy values from an array", () => {
    const arr = [0, 1, false, true, "", "hello", null, undefined];
    const filtered = filterFalsy(arr);
    expect(filtered).toEqual([1, true, "hello"]);
  });
});

describe("formatNumber", () => {
  it("should format a number with separators", () => {
    const num = 1234567.89;
    const formatted = formatNumber(num, { minimumFractionDigits: 2 });
    expect(formatted).toBe("1,234,567.89");
  });
});

describe("pluralize", () => {
  it("should pluralize a word based on count", () => {
    expect(pluralize("apple", 0)).toBe("apples");
    expect(pluralize("apple", 1)).toBe("apple");
    expect(pluralize("apple", 2)).toBe("apples");
  });
});

describe("truncateString", () => {
  it("should truncate a string to the specified length", () => {
    const str = "Lorem ipsum dolor sit amet";
    const truncated = truncateString(str, 10);
    expect(truncated).toBe("Lorem ipsu...");
  });
});

describe("validateEmail", () => {
  it("should validate an email address", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("invalid_email")).toBe(false);
  });
});
