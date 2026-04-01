export const createUniqueId = (prefix?: string): string => {
  const randomId = crypto.randomUUID();
  const firstChunk = randomId.split('-')[0];
  return prefix ? `${prefix}-${firstChunk}` : firstChunk;
};
