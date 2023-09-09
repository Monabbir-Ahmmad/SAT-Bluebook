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
  const styleCache = useEmotionCache();
  styleCache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${styleCache.key} ${Object.keys(styleCache.inserted).join(
        " "
      )}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(styleCache.inserted).join(" "),
      }}
    />
  ));

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <CacheProvider value={styleCache}>
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
