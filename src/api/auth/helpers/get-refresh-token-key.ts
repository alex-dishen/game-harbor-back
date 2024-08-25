export const getRefreshTokenKey = (
  userId: string,
  sessionId: string,
): string => {
  return `refreshToken:${userId}:${sessionId}`;
};
