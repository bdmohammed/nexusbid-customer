import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;

  isInitializing: boolean;

  setAuthenticated: (value: boolean) => void;

  setInitializing: (value: boolean) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  isInitializing: true,

  setAuthenticated: (value) =>
    set({
      isAuthenticated: value,
    }),

  setInitializing: (value) =>
    set({
      isInitializing: value,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
    }),
}));
