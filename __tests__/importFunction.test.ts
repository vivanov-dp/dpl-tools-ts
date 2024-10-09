import { importFunctionESM } from '../src/common';

describe('importFunctionESM', () => {
  it('imports a function successfully from a valid module', async () => {
    const mockModule = { myFunction: () => 'test' };

    const fn = await importFunctionESM('./validModule', 'myFunction', () => Promise.resolve(mockModule));
    expect(fn()).toBe('test');
  });

  it('throws an error if the function does not exist in the module', async () => {
    const mockModule = { anotherFunction: () => 'test' };

    await expect(importFunctionESM('./invalidFunctionModule', 'nonExistentFunction', () => Promise.resolve(mockModule)))
      .rejects
      .toThrow('Failed to import function "nonExistentFunction" from "./invalidFunctionModule":\n"nonExistentFunction" not found or not a function.');
  });

  it('throws an error if the module cannot be imported', async () => {
    await expect(importFunctionESM('./nonExistentModule', 'myFunction'))
      .rejects
      .toThrow('Failed to import function "myFunction" from "./nonExistentModule":\nFailed to import module from "./nonExistentModule": Cannot find module \'./nonExistentModule\' from \'src/common.ts\'');
  });

  it('throws an error if the imported entity is not a function', async () => {
    const mockModule = { notAFunction: 'I am not a function' };

    await expect(importFunctionESM('./notAFunctionModule', 'notAFunction', () => Promise.resolve(mockModule)))
      .rejects
      .toThrow('Failed to import function "notAFunction" from "./notAFunctionModule":\n"notAFunction" not found or not a function.');
  });
});
