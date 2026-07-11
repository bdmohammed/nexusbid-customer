import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeStore {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  reset: () => void;
}

const initialState = {
  theme: "system" as ThemeMode,
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...initialState,

      setTheme: (theme) =>
        set({
          theme,
        }),

      reset: () => set(initialState),
    }),
    {
      name: "theme",
    },
  ),
);
