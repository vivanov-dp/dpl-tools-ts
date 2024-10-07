/**
 * Utility type to make all properties of an object nullable.
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};



/**
 * Filter an object by its keys, keeping only the ones that start with a given prefix.
 *
 * @param obj - The object to filter
 * @param prefix - The prefix to filter by
 * @returns A new object with only the keys that start with the given prefix. The values are referenced, not copied.
 */
export function filterObject(obj: Record<string, any>, prefix: string): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (key.startsWith(prefix)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Find the longest sequence of a given element in an array.
 *
 * @param arr - The array to search
 * @param elm - The element to search for
 * @returns A tuple with the index of the first element of the longest sequence and the length of the sequence.
 * [-1,0] if no sequence is found.
 */
export function findLongestSequence<T>(arr: T[], elm: T): [number, number] {
  if (!arr || !Array.isArray(arr) || arr.length === 0
      || !elm || (typeof elm !== typeof arr[0])
  ) {
    return [-1, 0];
  }

  let longestIndex = -1;
  let longestLength = 0;
  let currentLength = 0;
  let currentIndex = -1;

  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === elm) {
      if (currentLength === 0) {
        currentIndex = i;
      }
      currentLength++;
    } else {
      if (currentLength > longestLength) {
        longestIndex = currentIndex;
        longestLength = currentLength;
      }
      currentLength = 0;
    }
  }

  return [longestIndex, longestLength];
}
/**
 * Find the longest sequence of '0' in an array of strings.
 * @param arr
 */
export function findLongestZeroSequence(arr: string[]): [number, number] {
  return findLongestSequence(arr, '0');
}
