"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppEntry } from "@/data/apps";
import { AppCard } from "@/components/AppCard";
import { useFavorites } from "@/context/FavoritesContext";
import { parseSort, sortApps } from "@/lib/sort";

type Props = {
  apps: AppEntry[];
  listKey: string;
};

export function AppGrid({ apps, listKey }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, favorites } = useFavorites();
  const favOnly = searchParams.get("fav") === "1";
  const sort = parseSort(searchParams.get("sort"));

  useEffect(() => {
    if (!ready || !favOnly) return;
    if (favorites.size > 0) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("fav");
    const s = params.toString();
    const t = window.setTimeout(() => {
      router.replace(s ? `/?${s}` : "/");
    }, 520);
    return () => window.clearTimeout(t);
  }, [ready, favOnly, favorites.size, router, searchParams]);

  const list = useMemo(() => {
    const base = favOnly
      ? apps.filter((app) => favorites.has(app.slug))
      : apps;
    return sortApps(base, sort);
  }, [apps, favOnly, favorites, sort]);

  return (
    <div
      className="app-list"
      key={`${listKey}:${favOnly ? "fav" : "all"}:${sort}`}
    >
      {list.map((app) => (
        <AppCard
          key={app.slug}
          app={app}
          exitOnUnfavorite={favOnly}
        />
      ))}
    </div>
  );
}
