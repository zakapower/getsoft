"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/SearchBox";
import { useApp } from "@/context/AppContext";
import { categoryIds, categoryLabels } from "@/data/categories";
import { getDictionary } from "@/i18n/dictionaries";

export function CatalogChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const { lang } = useApp();
  const dict = getDictionary(lang);
  const q = searchParams.get("q") ?? "";

  const categoryMatch = pathname.match(/\/category\/([^/]+)/);
  const activeCategory = categoryMatch?.[1] ?? null;
  const actionPath = activeCategory ? `/category/${activeCategory}` : "/";

  return (
    <div className="page">
      <div className="wrap">
        <div className="page__intro page__intro--center">
          <h1 className="page__title">{dict.brand}</h1>
          <p className="page__lead">{dict.tagline}</p>
          <SearchBox
            key={actionPath}
            placeholder={dict.searchPlaceholder}
            initialQuery={q}
            actionPath={actionPath}
          />
          <nav className="filters filters--center" aria-label={dict.categories}>
            <Link
              href="/"
              className={activeCategory ? undefined : "is-on"}
              scroll={false}
            >
              {dict.categoriesAll}
            </Link>
            {categoryIds.map((id) => (
              <Link
                key={id}
                href={`/category/${id}`}
                className={id === activeCategory ? "is-on" : undefined}
                scroll={false}
              >
                {categoryLabels[id][lang]}
              </Link>
            ))}
          </nav>
        </div>

        <section className="section">{children}</section>
      </div>
    </div>
  );
}
