import { transformer } from "../transformer";
import { removeWhitespace } from "../removeWhitespace";

describe("transformer", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
  it("should transform", () => {
    const input = `
        export type Interface = {
            a: string;
            b: number;
        }
        export type Interface2 = {
            a: string;
            c: number;
        }
        export type Interface3 = Interface & Interface2;
        `;
    const output = `
        export type Interface = {
            a: string;
            b: number;
        }
        export type Interface2 = {
            a: string;
            c: number;
        }
        export type Interface3 = {}`;
    const transformedOutput = transformer(input);
    expect(removeWhitespace(transformedOutput)).toEqual(
      removeWhitespace(output),
    );
  });
});
