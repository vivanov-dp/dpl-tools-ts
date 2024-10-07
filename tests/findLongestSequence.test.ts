import { findLongestSequence, findLongestZeroSequence } from '../src/common';

describe('findLongestSequence', () => {
  it('returns the correct index and length for the longest sequence of the element', () => {
    expect(findLongestSequence([1, 2, 2, 3, 2, 2, 2, 4], 2)).toEqual([4, 3]);
  });

  it('returns [-1, 0] for an empty array', () => {
    expect(findLongestSequence([], 2)).toEqual([-1, 0]);
  });

  it('returns [-1, 0] when the element is not found', () => {
    expect(findLongestSequence([1, 3, 4, 5], 2)).toEqual([-1, 0]);
  });

  it('returns the correct index and length when the sequence is at the start of the array', () => {
    expect(findLongestSequence([2, 2, 2, 1, 3, 4], 2)).toEqual([0, 3]);
  });

  it('returns the correct index and length when the sequence is at the end of the array', () => {
    expect(findLongestSequence([1, 3, 4, 2, 2, 2], 2)).toEqual([3, 3]);
  });

  it('returns the correct index and length for a single element array', () => {
    expect(findLongestSequence([2], 2)).toEqual([0, 1]);
  });

  it('returns the correct index and length for an array with all elements the same', () => {
    expect(findLongestSequence([2, 2, 2, 2, 2], 2)).toEqual([0, 5]);
  });

  it('returns the correct index and length for an array with multiple sequences of the same length', () => {
    expect(findLongestSequence([1, 2, 2, 3, 2, 2, 4, 2, 2], 2)).toEqual([1, 2]);
  });
});

describe('findLongestZeroSequence', () => {
  it('returns the correct index and length for the longest sequence of zeros', () => {
    expect(findLongestZeroSequence(['1', '0', '0', '1', '0', '0', '0', '1'])).toEqual([4, 3]);
  });

  it('returns [-1, 0] for an empty array', () => {
    expect(findLongestZeroSequence([])).toEqual([-1, 0]);
  });

  it('returns [-1, 0] when there are no zeros in the array', () => {
    expect(findLongestZeroSequence(['1', '2', '3', '4'])).toEqual([-1, 0]);
  });

  it('returns the correct index and length when the sequence is at the start of the array', () => {
    expect(findLongestZeroSequence(['0', '0', '0', '1', '2', '3'])).toEqual([0, 3]);
  });

  it('returns the correct index and length when the sequence is at the end of the array', () => {
    expect(findLongestZeroSequence(['1', '2', '3', '0', '0', '0'])).toEqual([3, 3]);
  });

  it('returns the correct index and length for a single element array', () => {
    expect(findLongestZeroSequence(['0'])).toEqual([0, 1]);
  });

  it('returns the correct index and length for an array with all elements as zeros', () => {
    expect(findLongestZeroSequence(['0', '0', '0', '0', '0'])).toEqual([0, 5]);
  });

  it('returns the correct index and length for an array with multiple sequences of the same length', () => {
    expect(findLongestZeroSequence(['1', '0', '0', '1', '0', '0', '2', '0', '0'])).toEqual([1, 2]);
  });
});
