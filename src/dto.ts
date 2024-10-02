/**
 * Data Transfer Object (DTO) base class.
 *
 * This class represents a general DTO, both incoming and outgoing.
 * DTOs are used to transfer data between different parts of the application, such as between the server and the client.
 *
 * DTO classes should implement the isInstance() method to check if a given object can be an instance of the DTO.
 * Use proxy.augmentObject() to convert the plain objects received through communication to DTO instances:
 *
 * ```typescript
 *   constructor(object?: any) {
 *     if (!DTO.isInstance(object)) {
 *       throw new Error(`Invalid DTO object: ${JSON.stringify(object)}`);
 *     }
 *
 *     return proxy.augmentObject(DTO, object) as DTO;
 *   }
 * ```
 *
 * @abstract
 */
export abstract class DTO {
  static isInstance(object: any): boolean {
    return (object !== undefined);
  }
}
