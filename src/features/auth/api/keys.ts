export const authQueryKeys = {
  all: ["auth"] as readonly ["auth"],
  me: () => [...authQueryKeys.all, "me"] as const,
  session: () => [...authQueryKeys.all, "session"] as const,
  sessions: () => [...authQueryKeys.all, "sessions"] as const,
  devices: () => [...authQueryKeys.all, "devices"] as const,
  csrf: () => [...authQueryKeys.all, "csrf"] as const,
};
