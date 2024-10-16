/**
 * Utility type to make all properties of an object nullable.
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};


/**
 * Assert that an object has the required keys.
 * @param data
 * @param requiredKeys
 * @param name - The name of the object, for error messages
 */
export function assertInterface<T>(data: Partial<T>, requiredKeys: string[], name: string): asserts data is T {
  if (!data) {
    throw new Error(`Invalid ${name}: ${JSON.stringify(data)}`);
  }
  for (const key of requiredKeys) {
    if (!(data as any)[key]) {
      throw new Error(`${name} data missing '${key}': ${JSON.stringify(data)}`);
    }
  }
}

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

async function importESM(srcPath: string): Promise<any> {
  try {
    return await import(srcPath);
  } catch (error) {
    throw new Error(`Failed to import module from "${srcPath}": ${(error as Error).message}`);
  }
}
/**
 * Dynamically imports a function from an ESM module.
 *
 * @param srcPath - The path to the ESM file.
 * @param fnName - The name of the function to import.
 * @param importer - The function to use for importing the module. Defaults to `import`.
 * @returns A promise that resolves to the imported function.
 */
export async function importFunctionESM(srcPath: string, fnName: string, importer= importESM): Promise<Function> {
  try {
    const module = await importer(srcPath);
    if (module[fnName] && typeof module[fnName] === 'function') {
      return module[fnName];
    } else {
      throw new Error(`"${fnName}" not found or not a function.`);
    }
  } catch (error) {
    throw new Error(`Failed to import function "${fnName}" from "${srcPath}":\n${(error as Error).message}`);
  }
}
