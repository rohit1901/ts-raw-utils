import { deepMerge } from "../";

describe("deepMerge", () => {
  it("should merge two objects deeply", () => {
    const target = {
      a: {
        b: 1,
      },
      c: 2,
    };
    const source = {
      a: {
        b: 2,
        c: 3,
      },
      d: 4,
    };
    const merged = deepMerge(target, source);
    expect(merged).toEqual({
      a: {
        b: 2,
        c: 3,
      },
      c: 2,
      d: 4,
    });
  });

  it("should handle merging when source values are not objects", () => {
    const target = {
      a: {
        b: 1,
      },
      c: 2,
    };
    const source = {
      a: {
        c: 1,
        b: 5,
      },
      d: 4,
    };
    const merged = deepMerge(target, source);
    expect(merged).toEqual({
      a: {
        c: 1,
        b: 5,
      },
      c: 2,
      d: 4,
    });
  });

  it("should handle merging when target values are not objects", () => {
    const target = {
      a: {
        b: 3,
      },
      c: 2,
    };
    const source = {
      a: {
        b: 3,
        c: 7,
      },
      d: 4,
    };
    const merged = deepMerge(target, source);
    expect(merged).toEqual({
      a: {
        b: 3,
        c: 7,
      },
      c: 2,
      d: 4,
    });
  });
});
