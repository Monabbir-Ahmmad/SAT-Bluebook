"use client";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";
import { useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="bottom-center" />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
