"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/i18n";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <I18nProvider>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
