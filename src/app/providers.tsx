"use client";

import { ReadmeProvider } from "@/store/useReadmeStore";
import { ThemeProvider } from "@/store/useThemeStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReadmeProvider>{children}</ReadmeProvider>
    </ThemeProvider>
  );
}
