import {assertInterface} from "../src/common";

describe('assertInterface', () => {
  it('throws an error if data is null', () => {
    expect(() => assertInterface(null as any, ['id'], 'Test Interface')).toThrow('Invalid Test Interface: null');
  });

  it('throws an error if data is missing required keys', () => {
    expect(() => assertInterface({}, ['id'], 'Test Interface')).toThrow("Test Interface data missing 'id': {}");
  });

  it('does not throw an error if data contains required keys', () => {
    expect(() => assertInterface({ id: 1 }, ['id'], 'Test Interface')).not.toThrow();
  });
});
