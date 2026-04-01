import { describe, expect, it } from 'vitest';
import { createUniqueId } from './createUniqueId';

describe('createUniqueId', () => {
  it('should generate a unique ID', () => {
    const id1 = createUniqueId();
    const id2 = createUniqueId();
    expect(id1).not.toBe(id2);
  });

  it('should generate an ID with the specified prefix', () => {
    const prefix = 'test';
    const id = createUniqueId(prefix);
    expect(id).toMatch(new RegExp(`^${prefix}-`));
  });

  it('should generate an ID of the expected length', () => {
    const id = createUniqueId();
    expect(id.length).toEqual(8);
  });
});
