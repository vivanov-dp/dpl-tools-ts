# Deeperplane Tools - Typescript

This is a collection of tools for working in Typescript.

## Installation

```bash
npm install @deeperplane/tools
```

## Proxy objects tools

- augmentObject()
- augmentArray()

These functions serve to add additional methods to already existing instances of objects or arrays.
The use of these functions is to convert a generic object instance, as returned by parsing JSON, or communicating
with a server, into an instance of a class that has properties and methods, to make it convenient to work with 
in Typescript.
    
    ```typescript
    import { augmentObject, augmentArray } from '@deeperplane/tools';

    const obj = { a: 1, b: 2 };
    class MyClass {
        a: number = 0;
        b: number = 0;
        sum() {
            return this.a + this.b;
        }
    }
    const myClass = augmentObject(MyClass, obj);

    console.log(myClass.sum()); // 3
    
    const arr = [1, 2, 3];
    class MyArray extends Array<number> {
        sum() {
            return this.reduce((acc, val) => acc + val, 0);
        }
    }
    const myArray = augmentArray(MyArray, arr);
    
    console.log(myArray.sum()); // 6
    ```
