"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { SortMenu } from "@/components/SortMenu";
import { useApp } from "@/context/AppContext";
import { useFavorites } from "@/context/FavoritesContext";
import { categoryIds, categoryLabels } from "@/data/categories";
import { getDictionary } from "@/i18n/dictionaries";
import { parseSort, type SortId } from "@/lib/sort";

export function CatalogChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useApp();
  const { favorites } = useFavorites();
  const dict = getDictionary(lang);
  const q = searchParams.get("q") ?? "";
  const favView = searchParams.get("fav") === "1";
  const sort = parseSort(searchParams.get("sort"));
  const hasFavorites = favorites.size > 0;

  const [favBtn, setFavBtn] = useState(false);
  const [favBtnLeaving, setFavBtnLeaving] = useState(false);

  useEffect(() => {
    if (hasFavorites || favView) {
      setFavBtn(true);
      setFavBtnLeaving(false);
      return;
    }
    if (favBtn) setFavBtnLeaving(true);
  }, [hasFavorites, favView, favBtn]);

  useEffect(() => {
    if (!favBtnLeaving) return;
    const timer = window.setTimeout(() => {
      setFavBtn(false);
      setFavBtnLeaving(false);
    }, 220);
    return () => window.clearTimeout(timer);
  }, [favBtnLeaving]);

  const categoryMatch = pathname.match(/\/category\/([^/]+)/);
  const activeCategory = categoryMatch?.[1] ?? null;
  const actionPath = activeCategory ? `/category/${activeCategory}` : "/";

  const extraQuery = useMemo(() => {
    const extras: Record<string, string> = {};
    if (favView && !activeCategory) extras.fav = "1";
    if (sort !== "name") extras.sort = sort;
    return extras;
  }, [favView, activeCategory, sort]);

  function hrefWith(base: string, patch: Record<string, string | null>) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sort !== "name") params.set("sort", sort);
    if (favView && base === "/") params.set("fav", "1");
    for (const [k, v] of Object.entries(patch)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    const s = params.toString();
    return s ? `${base}?${s}` : base;
  }

  const allHref = hrefWith("/", { fav: null });
  const favoritesHref = hrefWith("/", { fav: "1" });
  const favActive = !activeCategory && favView;
  const favToggleHref = favActive ? allHref : favoritesHref;

  useEffect(() => {
    const active = document.querySelector(".filters a.is-on");
    if (!(active instanceof HTMLElement)) return;
    active.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  function onSortChange(next: SortId) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "name") params.delete("sort");
    else params.set("sort", next);
    const s = params.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  }

  return (
    <div className="page">
      <div className="wrap">
        <div className="page__intro page__intro--center">
          <h1 className="page__title">{dict.brand}</h1>
          <p className="page__lead">{dict.tagline}</p>
          <SearchBox
            key={`${actionPath}?${favView ? "fav" : "all"}:${sort}`}
            placeholder={dict.searchPlaceholder}
            initialQuery={q}
            actionPath={actionPath}
            extraQuery={extraQuery}
          />
          <div className="catalog-toolbar">
            <nav className="filters filters--center" aria-label={dict.categories}>
              <Link
                href={allHref}
                className={!activeCategory && !favView ? "is-on" : undefined}
                scroll={false}
              >
                {dict.categoriesAll}
              </Link>
              {categoryIds.map((id) => (
                <Link
                  key={id}
                  href={`/category/${id}${sort !== "name" ? `?sort=${sort}` : ""}`}
                  className={id === activeCategory ? "is-on" : undefined}
                  scroll={false}
                >
                  {categoryLabels[id][lang]}
                </Link>
              ))}
            </nav>
            <div className="catalog-toolbar__actions">
              {favBtn ? (
                <Link
                  href={favToggleHref}
                  className={`catalog-action catalog-action--fav${favBtnLeaving ? " is-leaving" : ""}${favActive ? " is-on" : ""}`}
                  scroll={false}
                  aria-label={dict.favorites}
                  title={dict.favorites}
                  aria-pressed={favActive}
                  onAnimationEnd={() => {
                    if (!favBtnLeaving) return;
                    setFavBtn(false);
                    setFavBtnLeaving(false);
                  }}
                >
                  <Bookmark
                    className="catalog-action__icon"
                    strokeWidth={2.25}
                    fill={favActive ? "currentColor" : "none"}
                    aria-hidden
                  />
                </Link>
              ) : null}
              <SortMenu value={sort} onChange={onSortChange} />
            </div>
          </div>
        </div>

        <section className="section">{children}</section>
      </div>
    </div>
  );
}
