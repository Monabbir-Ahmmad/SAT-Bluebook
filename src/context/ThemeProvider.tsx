"use client";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useEmotionCache,
} from "@mantine/core";

import { AppFont } from "@/app/layout";
import { CacheProvider } from "@emotion/react";
import { Notifications } from "@mantine/notifications";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <CacheProvider value={cache}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ fontFamily: AppFont.style.fontFamily }}
        >
          <Notifications position="bottom-center" />
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </CacheProvider>
  );
}
