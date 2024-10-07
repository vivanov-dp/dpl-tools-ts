import {filterObject} from "../src/common";

describe('filterObject', () => {
  it('returns an object with keys that start with the given prefix', () => {
    expect(filterObject({ apple: 1, banana: 2, apricot: 3 }, 'ap')).toEqual({ apple: 1, apricot: 3 });
  });

  it('returns an empty object if no keys start with the given prefix', () => {
    expect(filterObject({ apple: 1, banana: 2, apricot: 3 }, 'ba')).toEqual({ banana: 2 });
  });

  it('returns an empty object if the input object is empty', () => {
    expect(filterObject({}, 'ap')).toEqual({});
  });

  it('returns the same object if the prefix is an empty string', () => {
    expect(filterObject({ apple: 1, banana: 2, apricot: 3 }, '')).toEqual({ apple: 1, banana: 2, apricot: 3 });
  });

  it('returns an empty object if the prefix does not match any keys', () => {
    expect(filterObject({ apple: 1, banana: 2, apricot: 3 }, 'z')).toEqual({});
  });

  it('returns the same object if all keys match the prefix', () => {
    expect(filterObject({ apple: 1, apricot: 3 }, 'ap')).toEqual({ apple: 1, apricot: 3 });
  });
});
