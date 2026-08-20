"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, type Lang } from "@/lib/lang";

type Theme = "light" | "dark";

interface AppState {
  lang: Lang;
  theme: Theme;
  themeReady: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (ru: string, en: string) => string;
}

const AppContext = createContext<AppState | null>(null);

function readStoredTheme(): Theme {
  try {
    const fromDom = document.documentElement.getAttribute("data-theme");
    if (fromDom === "dark") return "dark";
    if (fromDom === "light") return "light";
    const stored = localStorage.getItem("getsoft-theme");
    if (stored === "dark" || stored === "light") return stored;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("getsoft-theme", theme);
  } catch {
    /* ignore */
  }
}

function writeLangCookie(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export function AppProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>("light");
  const [themeReady, setThemeReady] = useState(false);

  useLayoutEffect(() => {
    const next = readStoredTheme();
    setTheme(next);
    applyTheme(next);
    const id = requestAnimationFrame(() => setThemeReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setLangState(initialLang);
  }, [initialLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<AppState>(
    () => ({
      lang,
      theme,
      themeReady,
      setLang: (next) => {
        writeLangCookie(next);
        setLangState(next);
        router.refresh();
      },
      toggleLang: () => {
        const next: Lang = lang === "ru" ? "en" : "ru";
        writeLangCookie(next);
        setLangState(next);
        router.refresh();
      },
      toggleTheme: () => {
        const next: Theme = theme === "light" ? "dark" : "light";
        document.documentElement.classList.add("theme-switching");
        applyTheme(next);
        setTheme(next);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove("theme-switching");
          });
        });
      },
      t: (ru, en) => (lang === "ru" ? ru : en),
    }),
    [lang, theme, themeReady, router],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
