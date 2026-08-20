"use client";

import { Download } from "lucide-react";
import type { AppEntry } from "@/data/apps";
import { AppIcon } from "./AppIcon";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionaries";

type Props = {
  app: AppEntry;
};

export function AppCard({ app }: Props) {
  const { lang } = useApp();
  const dict = getDictionary(lang);

  return (
    <article className="app-card">
      <AppIcon app={app} />
      <h2 className="app-card__name">{app.name}</h2>
      <a
        className="btn btn--sm app-card__btn"
        href={app.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download className="btn__icon" strokeWidth={2.25} aria-hidden />
        {dict.download}
      </a>
    </article>
  );
}
