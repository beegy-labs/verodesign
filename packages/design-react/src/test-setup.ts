import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

expect.extend({
  toHaveAttribute(received: Element | null, name: string, value?: string) {
    if (!(received instanceof Element)) {
      return {
        pass: false,
        message: () => `expected an Element but received ${String(received)}`,
      };
    }
    const actual = received.getAttribute(name);
    const pass = value === undefined ? actual !== null : actual === value;
    return {
      pass,
      message: () =>
        value === undefined
          ? `expected element ${pass ? 'not ' : ''}to have attribute ${name}`
          : `expected attribute ${name} ${pass ? 'not ' : ''}to equal ${value}; received ${actual}`,
    };
  },
});
