import { calculateGatewayIPv4 } from '../src/ip';

describe('calculateGatewayIPv4', () => {
  it('returns the correct gateway address for a valid IPv4 with prefix length', () => {
    expect(calculateGatewayIPv4('192.168.1.10/24')).toBe('192.168.1.1');
  });

  it('throws an error for an invalid IP address format', () => {
    expect(() => calculateGatewayIPv4('192.168.1.10')).toThrow('Invalid IP address: 192.168.1.10');
  });

  it('throws an error for an invalid prefix length', () => {
    expect(() => calculateGatewayIPv4('192.168.1.10/33')).toThrow('Invalid prefix length: 33');
  });

  it('returns the correct gateway address for a /16 prefix length', () => {
    expect(calculateGatewayIPv4('172.16.5.4/16')).toBe('172.16.0.1');
  });

  it('returns the correct gateway address for a /8 prefix length', () => {
    expect(calculateGatewayIPv4('10.0.0.5/8')).toBe('10.0.0.1');
  });

  it('returns the correct gateway address for a /32 prefix length', () => {
    expect(calculateGatewayIPv4('192.168.1.10/32')).toBe('192.168.1.1');
  });

  it('throws an error for an empty string input', () => {
    expect(() => calculateGatewayIPv4('')).toThrow('Invalid IP address: ');
  });

  it('returns the correct gateway address for a /0 prefix length', () => {
    expect(calculateGatewayIPv4('0.0.0.0/0')).toBe('0.0.0.1');
  });
});
