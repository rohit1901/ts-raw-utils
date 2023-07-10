```
# Typescript Utility Functions

A collection of TypeScript utility functions to enhance your development experience.

## Installation

npm install typescript-utils
```

## Usage

### EnumValues

```typescript
import { enumValues } from 'typescript-utils';

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

const colors = enumValues(Color);
console.log(colors); // ['red', 'green', 'blue']
```

### Writable

```typescript
import { writable } from 'typescript-utils';

interface Point {
  x: number;
  y: number;
}

const point: Writable<Point> = { x: 0, y: 0 };
point.x = 10;
console.log(point); // { x: 10, y: 0 }
```

### DeepPartial

```typescript
import { deepPartial } from 'typescript-utils';

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

```typescript
import { promisify } from 'typescript-utils';

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

### UnionToIntersection

```typescript
import { unionToIntersection } from 'typescript-utils';

type A = { a: string };
type B = { b: number };
type C = { c: boolean };

type ABC = UnionToIntersection<A | B | C>;
// Equivalent to: { a: string } & { b: number } & { c: boolean }

const obj: ABC = { a: 'hello', b: 123, c: true };
console.log(obj); // { a: 'hello', b: 123, c: true }
```

## Contributing

Contributions are welcome! If you have any bug fixes, improvements, or new utility function suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Feel free to customize and expand this README file with more information about your utility functions, usage examples, guidelines for contributions, and any other relevant details.

Let me know if you have any further questions or need additional assistance!