import {findLongestZeroSequence} from "./common";

/**
 * Calculate the gateway address for an IPv4 by examining the prefix length and finding the lowest possible IP
 * ending on .1
 *
 * @param ipWithPrefix - The IPv4 address with prefix length (e.g., "192.168.1.10/24")
 * @throws Error if the IP address or prefix length is invalid
 * @returns The gateway address (e.g., "192.168.1.1")
 */
function calculateGatewayIPv4(ipWithPrefix: string): string {
  // Check inputs
  const [ipAddress, prefixLengthStr] = ipWithPrefix.split('/');
  if (!ipAddress || !prefixLengthStr) {
    throw new Error(`Invalid IP address: ${ipWithPrefix}`);
  }
  const prefixLength = parseInt(prefixLengthStr, 10);
  if (prefixLength < 0 || prefixLength > 32) {
    throw new Error(`Invalid prefix length: ${prefixLength}`);
  }
  if (prefixLength === 32) {
    return ipAddress;
  }

  // Convert IP address to binary
  const ipParts = ipAddress.split('.').map(part => parseInt(part, 10));
  const ipBinary = ipParts.map(part => part.toString(2).padStart(8, '0')).join('');

  // Calculate the network address
  const networkBinary = ipBinary.slice(0, prefixLength).padEnd(32, '0');

  // Convert network address back to decimal
  const networkParts = [];
  for (let i = 0; i < 32; i += 8) {
    networkParts.push(parseInt(networkBinary.slice(i, i + 8), 2));
  }

  // Add 1 to the last octet to get the gateway address
  networkParts[3] += 1;

  // Return the gateway address
  return networkParts.join('.');
}

/**
 * Calculate the gateway address for an IPv6 by examining the prefix length and finding the lowest possible
 * IP ending on ::1
 *
 * @param ipWithPrefix - The IPv6 address with prefix length (e.g., "2001:0db8:85a3::8a2e:0370:7334/64", "fc00::12ff:10.2.21.12/64")
 * @throws Error if the IP address or prefix length is invalid
 * @returns The gateway address (e.g., "2001:0db8:85a3::1")
 */
function calculateGatewayIPv6(ipWithPrefix: string): string {
  // Check inputs
  const [ipAddress, prefixLengthStr] = ipWithPrefix.split('/');
  if (!ipAddress || !prefixLengthStr) {
    throw new Error(`Invalid IP address: ${ipWithPrefix}`);
  }
  const prefixLength = parseInt(prefixLengthStr, 10);
  if (prefixLength < 0 || prefixLength > 128) {
    throw new Error(`Invalid prefix length: ${prefixLength}`);
  }
  if (prefixLength === 128) {
    return ipAddress;
  }

  // Convert IP address to binary, handling mixed IPv6/IPv4 notation
  let ipParts = ipAddress.split(':');
  const lastPart = ipParts[ipParts.length - 1];
  let ipBinary: string;

  if (lastPart?.includes('.')) {
    // Handle mixed IPv6/IPv4 notation
    const ipv4Parts = lastPart.split('.').map(part => parseInt(part, 10).toString(2).padStart(8, '0')).join('');
    ipParts[ipParts.length - 1] = parseInt(ipv4Parts.slice(0, 16), 2).toString(16);
    ipParts.push(parseInt(ipv4Parts.slice(16), 2).toString(16));
  }

  // Find the last empty part and replace it with the correct number of '0' parts
  const emptyIndex = ipParts.indexOf('');
  if (emptyIndex >= 0) {
    // Creat the correct number of '0' parts
    const emptyParts = new Array(8 - ipParts.slice(emptyIndex + 1).length - emptyIndex).fill('0');
    ipParts.splice(emptyIndex, 1, ...emptyParts);
  }

  // Replace any '' parts with '0' (this happens with an address like "::1")
  ipParts = ipParts.map(part => part === '' ? '0' : part);

  // Convert the IP address to binary
  ipBinary = ipParts.map(part => parseInt(part, 16).toString(2).padStart(16, '0')).join('');

  // Calculate the network address and set the last bit to 1 to get the gateway address
  let networkBinary = ipBinary.slice(0, prefixLength).padEnd(128, '0');
  networkBinary = networkBinary.slice(0, -1) + '1';

  // Convert network address back to hexadecimal
  const networkParts: string[] = [];
  for (let i = 0; i < 128; i += 16) {
    networkParts.push(parseInt(networkBinary.slice(i, i + 16), 2).toString(16));
  }

  // Find the index of the longest sequence of '0' parts
  const [longestIndex, longestLength] = findLongestZeroSequence(networkParts);
  if (longestLength >= 2) {
    networkParts.splice(longestIndex, longestLength, '');
  }

  // Return the gateway address
  if (networkParts.length < 3) {
    networkParts.splice(0, 0, '');
  }
  return networkParts.join(':');
}
/**
 * Calculate the gateway address for an IP address with prefix length
 *
 * @param ipWithPrefix - The IP address with prefix length, either IPv4 or IPv6, IPv6 might have mixed IPv6/IPv4 notation
 * @returns The gateway address
 * @throws Error if the IP address or prefix length is invalid
 * @see calculateGatewayIPv4
 * @see calculateGatewayIPv6
 *
 * @example
 * calculateGateway("2001:0db8:85a3::8a2e:0370:7334/64")
 * // Returns "2001:0db8:85a3::1"
 *
 * @example
 * calculateGateway("fc00::12ff:10.2.21.12/96")
 * // Returns "fc00::12ff:0:1"
 *
 * @example
 * calculateGateway("192.168.1.10/24")
 * // Returns "192.168.1.1"
 */
export function calculateGateway(ipWithPrefix: string): string {
  if (ipWithPrefix.includes(':')) {
    return calculateGatewayIPv6(ipWithPrefix);
  } else {
    return calculateGatewayIPv4(ipWithPrefix);
  }
}
