import { proxyObj } from '../src';

class TestArray extends Array {
  method() {
    return 'method result';
  }
  property = 'property value';
}

describe('augmentArray', () => {
  it('adds class methods to the source array', () => {
    const target = [1, 2, 3];
    const proxyArray = proxyObj.augmentArray(TestArray, target);
    expect(proxyArray?.method()).toBe('method result');
  });

  it('doesn\'t add class properties that are not on the generic object', () => {
    const target = [1, 2, 3];
    const proxyArray = proxyObj.augmentArray(TestArray, target);
    expect(proxyArray?.property).toBeUndefined();
  });

  it('keeps original data of the source array', () => {
    const target = [1, 2, 3];
    const proxyArray = proxyObj.augmentArray(TestArray, target);
    expect(proxyArray?.[0]).toBe(1);
    expect(proxyArray?.[1]).toBe(2);
    expect(proxyArray?.[2]).toBe(3);
  });

  it('returns undefined if no data is provided', () => {
    const proxyArray = proxyObj.augmentArray(TestArray);
    expect(proxyArray).toBeUndefined();
  });
});
