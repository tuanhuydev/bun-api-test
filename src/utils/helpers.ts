export const getErrorResponse = (
  error: Error,
): { error: string; data: null } => {
  return { error: error.message, data: null };
};
