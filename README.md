# Typescript Utility Functions
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build Status](https://github.com/rohit1901/ts-raw-utils/actions/workflows/ci.yml/badge.svg)


> A TypeScript project that provides utility functions for your TypeScript projects.

## Installation
``` bash
npm install ts-raw-utils
```

## Usage

### EnumValues
Retrieves the values of an enum as an array.
```typescript
import { enumValues } from 'ts-raw-utils';

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

const colors = enumValues(Color);
console.log(colors); // ['red', 'green', 'blue']
```

### Writable
Creates a type that allows modifying properties of an object. The Writable type allows you to make properties of an interface or type mutable, even if they are originally defined as read-only.
```typescript
import { writable } from 'ts-raw-utils';

interface Point {
  x: number;
  y: number;
}

const point: Writable<Point> = { x: 0, y: 0 };
point.x = 10;
console.log(point); // { x: 10, y: 0 }
```

### DeepPartial
Creates a type that makes all properties of an object optional, including nested properties.
```typescript
import { deepPartial } from 'ts-raw-utils';

interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
}

const partialPerson: DeepPartial<Person> = {
  name: 'John',
  address: {
    city: 'New York',
  },
};
console.log(partialPerson); // { name: 'John', address: { city: 'New York' } }
```

### Promisify
Converts a callback-based function into a Promise-based function.
```typescript
import { promisify } from 'ts-raw-utils';

function exampleAsyncFunction(arg: number, callback: (result: string) => void) {
  setTimeout(() => {
    const result = `Processed: ${arg}`;
    callback(result);
  }, 1000);
}

const promisifiedFn = promisify(exampleAsyncFunction);
promisifiedFn(123).then((result) => {
  console.log(result); // 'Processed: 123'
});
```
The Promisify function takes a callback-based function and returns a new function that returns a Promise. The original callback-based function is invoked with the same arguments, but instead of providing a callback, the Promise is resolved with the result.
### UnionToIntersection
Creates a new type that represents the intersection of multiple types in a union.
The UnionToIntersection utility function takes a union of types and creates a new type that represents the intersection of those types. The resulting type contains all the properties and methods from each type in the union.
```typescript
import { unionToIntersection } from 'ts-raw-utils';

type A = { a: string };
type B = { b: number };
type C = { c: boolean };

type ABC = UnionToIntersection<A | B | C>;
// Equivalent to: { a: string } & { b: number } & { c: boolean }

const obj: ABC = { a: 'hello', b: 123, c: true };
console.log(obj); // { a: 'hello', b: 123, c: true }
```


### ChunkArray
Splits an array into chunks of a specified size.
```typescript
import { ChunkArray } from 'ts-raw-utils';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunks = ChunkArray(numbers, 3);
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

### DeepMerge
Deeply merges two objects, combining their properties into a new object. If a property exists in both objects and they are both objects themselves, the function recursively merges them. If the property exists in both objects and at least one of them is not an object, the value from the second object overwrites the value from the first object.
```typescript
import { DeepMerge } from 'ts-raw-utils';

const target = { a: { b: 1 }, c: 2 };
const source = { a: { c: 3 }, d: 4 };
const merged = DeepMerge(target, source);
console.log(merged); // { a: { b: 1, c: 3 }, c: 2, d: 4 }
```

### Deserialize
Converts a JSON string to a JavaScript object.
```typescript
import { Deserialize } from 'ts-raw-utils';

const json = '{"name":"John","age":30}';
const obj = Deserialize<Person>(json);
console.log(obj); // { name: 'John', age: 30 }
```

### FilterFalsy
Filters out falsy values from an array, returning a new array with only the truthy values.
```typescript
import { FilterFalsy } from 'ts-raw-utils';

const values = [0, '', null, undefined, false, 'Hello', 123];
const filtered = FilterFalsy(values);
console.log(filtered); // ['', 'Hello', 123]
```

### FlattenArray
Flattens a nested array into a single-level array.
```typescript
import { FlattenArray } from 'ts-raw-utils';

const nestedArray = [[1, 2], [3, [4, 5]], [6]];
const flattened = FlattenArray(nestedArray);
console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

### FormatNumber
Formats a number with optional formatting options using the toLocaleString method.
```typescript
import { FormatNumber } from 'ts-raw-utils';

const number = 1234567.89;
const formatted = FormatNumber(number, { style: 'currency', currency: 'USD' });
console.log(formatted); // $1,234,567.89
```

### Pluralize
Returns the singular or plural form of a word based on a count.
```typescript
import { Pluralize } from 'ts-raw-utils';

const item = 'apple';
const count = 3;
const pluralized = Pluralize(item, count);
console.log(pluralized); // 'apples'
```

### Serialize
Converts a JavaScript object to a JSON string.
```typescript
import { Serialize } from 'ts-raw-utils';

const obj = { name: 'John', age: 30 };
const json = Serialize(obj);
console.log(json); // '{"name":"John","age":30}'
```

### ShuffleArray
Randomly shuffles the elements of an array using the Fisher-Yates algorithm.
```typescript
import { ShuffleArray } from 'ts-raw-utils';

const numbers = [1, 2, 3, 4, 5];
const shuffled = ShuffleArray(numbers);
console.log(shuffled); // [3, 1, 4, 5, 2] (random order)
```
### TruncateString
Truncates a string to a specified length, appending an ellipsis if needed.
```typescript
import { TruncateString } from 'ts-raw-utils';

const str = 'Lorem ipsum dolor sit amet';
const truncated = TruncateString(str, 10);
console.log(truncated); // 'Lorem ipsu...'
```

### UniqueArray
Removes duplicate values from an array, returning a new array with only unique values.
```typescript
import { UniqueArray } from 'ts-raw-utils';

const numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = UniqueArray(numbers);
console.log(unique); // [1, 2, 3, 4, 5]
```
### replaceAll
Replaces all occurrences of a substring in a string with a new substring.
```typescript
import { replaceAll } from 'ts-raw-utils';
const str = 'Hello, World!';
const replaced = replaceAll(str, 'l', 'x');
console.log(replaced); // 'Hexxo, Worxd!'
```
### capitalize
Capitalizes the first letter of a string.

```typescript
import {capitalize} from 'ts-raw-utils';
import {getEscapedCapitalizedStringLiteral, getEscapedStringLiteral} from "./index";

const str = 'hello, world!';
const capitalized = capitalize(str);
console.log(capitalized); // 'Hello, world!'
const escaped = getEscapedStringLiteral('"hello, world!"');
console.log(escaped); // 'Hello, world!'
const escapedCapitalized = getEscapedCapitalizedStringLiteral("'hello, world!'");
console.log(escapedCapitalized); // 'Hello, world!'
```
### removeWhitespace
Removes all whitespace from a string.
```typescript
import { removeWhitespace } from 'ts-raw-utils';
const str = '  Hello, World!  ';
const trimmed = removeWhitespace(str);
console.log(trimmed); // 'Hello,World!'
```
### transformer
transforms intersection types in your TypeScript code into type guard signatures. 
This function can help you generate type guard signatures for complex types, making your TypeScript code more expressive and maintainable.
```typescript
import { transformer } from 'ts-raw-utils';
const inputCode = `
type IntersectionType = TypeA & TypeB;
type TypeA = { a: string };
type TypeB = { b: number };
`;
const transformedCode = transformer(inputCode);
console.log(transformedCode); 
// type IntersectionType = {};
// type TypeA = { a: string };
// type TypeB = { b: number };
```
## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/rohit1901/ts-raw-utils).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to customize and expand this README file with more information about your utility functions, usage examples, guidelines for contributions, and any other relevant details.

Let me know if you have any further questions or need additional assistance!