"use client";

import { Bookmark, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AppEntry } from "@/data/apps";
import { AppIcon } from "./AppIcon";
import { useApp } from "@/context/AppContext";
import { useFavorites } from "@/context/FavoritesContext";
import { getDictionary } from "@/i18n/dictionaries";

type Props = {
  app: AppEntry;
  /** Animate out before removing favorite (favorites view). */
  exitOnUnfavorite?: boolean;
};

export function AppCard({ app, exitOnUnfavorite = false }: Props) {
  const { lang, t } = useApp();
  const dict = getDictionary(lang);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(app.slug);
  const [popping, setPopping] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveDone = useRef(false);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => finishLeave(), 280);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  function finishLeave() {
    if (leaveDone.current) return;
    leaveDone.current = true;
    toggleFavorite(app.slug);
  }

  function onToggle() {
    if (favorited && exitOnUnfavorite) {
      if (leaving) return;
      // Last item: leave favorites view immediately
      if (favorites.size <= 1) {
        toggleFavorite(app.slug);
        return;
      }
      setLeaving(true);
      return;
    }
    toggleFavorite(app.slug);
    setPopping(false);
    requestAnimationFrame(() => setPopping(true));
  }

  return (
    <article
      className={`app-card${leaving ? " is-leaving" : ""}`}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (leaving) finishLeave();
      }}
    >
      <button
        type="button"
        className={`app-card__fav${favorited || leaving ? " is-on" : ""}${popping ? " is-pop" : ""}`}
        onClick={onToggle}
        onAnimationEnd={(e) => {
          e.stopPropagation();
          setPopping(false);
        }}
        aria-pressed={favorited && !leaving}
        aria-label={
          favorited
            ? t("Убрать из избранного", "Remove from favorites")
            : t("В избранное", "Add to favorites")
        }
      >
        <Bookmark
          className="app-card__fav-icon"
          strokeWidth={2.25}
          fill={favorited || leaving ? "currentColor" : "none"}
          aria-hidden
        />
      </button>
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
