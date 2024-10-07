/**
 * Calculate the gateway address for an IPv4 by examining the prefix length and finding the lowest possible IP
 * ending on .1
 *
 * @param ipWithPrefix - The IPv4 address with prefix length (e.g., "192.168.1.10/24")
 * @throws Error if the IP address or prefix length is invalid
 * @returns The gateway address (e.g., "192.168.1.1")
 */
export function calculateGatewayIPv4(ipWithPrefix: string): string {
  const [ipAddress, prefixLengthStr] = ipWithPrefix.split('/');
  if (!ipAddress || !prefixLengthStr) {
    throw new Error(`Invalid IP address: ${ipWithPrefix}`);
  }

  const prefixLength = parseInt(prefixLengthStr, 10);
  if (prefixLength < 0 || prefixLength > 32) {
    throw new Error(`Invalid prefix length: ${prefixLength}`);
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

  // Set the last octet to 1 to get the gateway address
  networkParts[3] = 1;

  // Return the gateway address
  return networkParts.join('.');
}
