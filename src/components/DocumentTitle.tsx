"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionaries";

export function DocumentTitle() {
  const pathname = usePathname() || "/";
  const { lang } = useApp();

  useEffect(() => {
    const dict = getDictionary(lang);
    if (pathname.startsWith("/about")) {
      document.title = `${dict.brand} - ${dict.about}`;
      return;
    }
    document.title = dict.brand;
  }, [pathname, lang]);

  return null;
}
