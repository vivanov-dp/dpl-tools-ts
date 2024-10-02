/**
 * Creates a proxy object of the given type, on top of the given data object.
 *
 * Use this function to convert a plain object, as received by parsing a JSON for example, to an object with methods.
 *
 * This will add the methods from the proxyType class to the data object, without modifying the data object or
 * creating a new instance of the proxyType. Since the proxyType constructor is never called, properties that are not
 * already on the data object will not be added or initialized and will be undefined in the resulting object.
 *
 * An inheritance scheme with a base class like ProxiedObject<T> can't be used, because any properties that exist
 * on the extending class will get set to undefined on the data instance as soon as the super() constructor is called.
 * @param proxyType
 * @param data
 */
export function augmentObject<T extends Object>(proxyType: { new(): T }, data?: Object): T | undefined {
  if (!data) {
    return undefined;
  }

  // Apply the proxy to the data object
  return new Proxy<Object>(data, {
    // Add our getters to the data object
    get: (target, prop, receiver) => {
      if (proxyType.prototype.hasOwnProperty(prop)) {
        return Reflect.get(proxyType.prototype, prop, target);
      }

      return Reflect.get(target, prop, receiver);
    }
  }) as T;
}

/**
 * Creates a proxy array of the given type, on top of the given data array.
 *
 * Use this function to convert a plain array, as received by parsing a JSON for example, to an array with
 * additional methods.
 *
 * This will add the methods from the proxyType class to the data array, without modifying the data array or
 * creating a new instance of the proxyType. Since the proxyType constructor is never called, properties that are not
 * already on the data array will not be added or initialized and will be undefined in the resulting array.
 *
 * A base class like ProxiedArray<T> can't be used, because any properties on the extending class
 * will get set to undefined as soon as the super() constructor is called, overwriting the properties
 * on the data array.
 * @param proxyType
 * @param array
 */
export function augmentArray<T extends Array<any>>(proxyType: { new(): T }, array?: any[]): T | undefined {
  if (!array) {
    return undefined;
  }

  // Apply the proxy to the array
  return new Proxy<Array<any>>(array, {
    // Add our getters to the array
    get: (target, prop, receiver) => {
      if (proxyType.prototype.hasOwnProperty(prop)) {
        return Reflect.get(proxyType.prototype, prop, target);
      }

      return Reflect.get(target, prop, receiver);
    }
  }) as T;
}
