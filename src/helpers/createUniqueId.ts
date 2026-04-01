export const createUniqueId = (prefix?: string): string => {
  return prefix ? `${prefix}-${crypto.randomUUID()}}` : crypto.randomUUID();
};
