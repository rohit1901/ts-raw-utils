import { flattenArray } from '../';

describe('flattenArray', () => {

    it('should flatten a nested array', () => {
        const nestedArray = [1, [2, [3, 4], 5], 6];
        const flattened = flattenArray(nestedArray);
        expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });


    it('should handle an already flattened array', () => {
        const flattenedArray: (number | number[])[] = [1, 2, 3, 4, 5, 6];
        const flattened = flattenArray(flattenedArray);
        expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle an empty array', () => {
        const emptyArray: (number | number[])[] = [];
        const flattened = flattenArray(emptyArray);
        expect(flattened).toEqual([]);
    });
});
