export const REDIRECT_TO = "[REDIRECT] REDIRECT_TO";

export const redirectTo = (payload: string) => ({
  type: REDIRECT_TO,
  payload
});
