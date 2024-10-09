import { proxyObj } from '../src';

class TestClass {
  constructor() {
    throw new Error('This class should not be instantiated');
  }
  method() {
    return 'method result';
  }
  property = 'property value';
  a: number = 0;
  b: number = 0;
}

describe('augmentObject', () => {
  it('adds class methods to the generic object', () => {
    const target = { a: 1 };
    const proxyObject = proxyObj.augmentObject(TestClass, target);
    expect(proxyObject?.method()).toBe('method result');
  });

  it('doesn\'t add class properties that are not on the generic object', () => {
    const target = { a: 1 };
    const proxyObject = proxyObj.augmentObject(TestClass, target);
    expect(proxyObject?.property).toBeUndefined();
  });

  it('overrides class properties with generic object properties', () => {
    const target = { property: 'overridden value' };
    const proxyObject = proxyObj.augmentObject(TestClass, target);
    expect(proxyObject?.property).toBe('overridden value');
  });

  it('keeps original properties of the generic object', () => {
    const target = { a: 1, b: 2 };
    const proxyObject = proxyObj.augmentObject(TestClass, target);
    expect(proxyObject?.a).toBe(1);
    expect(proxyObject?.b).toBe(2);
  });

  it('returns undefined if no data is provided', () => {
    const proxyObject = proxyObj.augmentObject(TestClass);
    expect(proxyObject).toBeUndefined();
  });
});
