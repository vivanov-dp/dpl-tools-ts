import {calculateGateway} from '../src/ip';

describe('calculateGateway - IPv4', () => {
  it('returns the correct gateway address for a valid IPv4 with prefix length', () => {
    expect(calculateGateway('192.168.1.10/24')).toBe('192.168.1.1');
  });

  it('throws an error for an invalid IP address format', () => {
    expect(() => calculateGateway('192.168.1.10')).toThrow('Invalid IP address: 192.168.1.10');
  });

  it('throws an error for an invalid prefix length', () => {
    expect(() => calculateGateway('192.168.1.10/33')).toThrow('Invalid prefix length: 33');
  });

  it('returns the correct gateway address for a /32 prefix length', () => {
    expect(calculateGateway('192.168.1.10/32')).toBe('192.168.1.10');
  });
  it('returns the correct gateway address for a /30 prefix length', () => {
    expect(calculateGateway('192.168.1.73/30')).toBe('192.168.1.73');
  });
  it('returns the correct gateway address for a /29 prefix length', () => {
    expect(calculateGateway('192.168.1.78/29')).toBe('192.168.1.73');
  });
  it('returns the correct gateway address for a /28 prefix length', () => {
    expect(calculateGateway('192.168.1.78/28')).toBe('192.168.1.65');
  });
  it('returns the correct gateway address for a /20 prefix length', () => {
    expect(calculateGateway('22.87.14.31/20')).toBe('22.87.0.1');
  });
  it('returns the correct gateway address for a /16 prefix length', () => {
    expect(calculateGateway('172.16.5.4/16')).toBe('172.16.0.1');
  });
  it('returns the correct gateway address for a /10 prefix length', () => {
    expect(calculateGateway('10.131.18.5/10')).toBe('10.128.0.1');
  });
  it('returns the correct gateway address for a /8 prefix length', () => {
    expect(calculateGateway('10.0.0.5/8')).toBe('10.0.0.1');
  });

  it('throws an error for an empty string input', () => {
    expect(() => calculateGateway('')).toThrow('Invalid IP address: ');
  });

  it('returns the correct gateway address for a /0 prefix length', () => {
    expect(calculateGateway('0.0.0.0/0')).toBe('0.0.0.1');
  });
});

describe('calculateGateway - IPv6', () => {
  it('returns the correct gateway address for a valid IPv6 with prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7334/64')).toBe('2001:db8:85a3::1');
  });

  it('throws an error for an invalid IP address format', () => {
    expect(() => calculateGateway('2001:0db8:85a3::8a2e:0370:7334')).toThrow('Invalid IP address: 2001:0db8:85a3::8a2e:0370:7334');
  });

  it('throws an error for an invalid prefix length', () => {
    expect(() => calculateGateway('2001:0db8:85a3::8a2e:0370:7334/129')).toThrow('Invalid prefix length: 129');
  });

  it('returns the correct gateway address for a /128 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7334/128')).toBe('2001:0db8:85a3::8a2e:0370:7334');
  });
  it('returns the correct gateway address for a /126 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7339/126')).toBe('2001:db8:85a3::8a2e:370:7339');
  });
  it('returns the correct gateway address for a /122 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7339/122')).toBe('2001:db8:85a3::8a2e:370:7301');
  });
  it('returns the correct gateway address for a /116 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7339/116')).toBe('2001:db8:85a3::8a2e:370:7001');
  });
  it('returns the correct gateway address for a /112 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7334/112')).toBe('2001:db8:85a3::8a2e:370:1');
  });
  it('returns the correct gateway address for a /78 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::a134:8a2e:0370:7334/78')).toBe('2001:db8:85a3:0:a134::1');
  });
  it('returns the correct gateway address for a /69 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::a134:8a2e:0370:7334/69')).toBe('2001:db8:85a3:0:a000::1');
  });
  it('returns the correct gateway address for a /36 prefix length', () => {
    expect(calculateGateway('2001:0db8:85a3::8a2e:0370:7334/36')).toBe('2001:db8:8000::1');
  });

  it('returns the correct gateway address for a mixed IPv6/IPv4 notation', () => {
    expect(calculateGateway('fc00::12ff:10.2.21.12/64')).toBe('fc00::1');
  });

  it('throws an error for an empty string input', () => {
    expect(() => calculateGateway('')).toThrow('Invalid IP address: ');
  });

  it('returns the correct gateway address for a /0 prefix length', () => {
    expect(calculateGateway('::/0')).toBe('::1');
  });

  it('returns the correct gateway address for an IPv6 with leading zeros', () => {
    expect(calculateGateway('2001:0db8:0000:0000:0000:0000:0000:0001/64')).toBe('2001:db8::1');
  });
});
