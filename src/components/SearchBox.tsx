"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  placeholder: string;
  initialQuery?: string;
  actionPath?: string;
  extraQuery?: Record<string, string>;
};

function buildHref(
  actionPath: string,
  extraQuery: Record<string, string>,
  query: string,
) {
  const params = new URLSearchParams(extraQuery);
  const q = query.trim();
  if (q) params.set("q", q);
  else params.delete("q");
  const s = params.toString();
  return s ? `${actionPath}?${s}` : actionPath;
}

export function SearchBox({
  placeholder,
  initialQuery = "",
  actionPath = "/",
  extraQuery = {},
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const extraKey = useMemo(
    () =>
      Object.keys(extraQuery)
        .sort()
        .map((k) => `${k}=${extraQuery[k]}`)
        .join("&"),
    [extraQuery],
  );

  useEffect(() => {
    const extras = Object.fromEntries(
      extraKey
        ? extraKey.split("&").map((pair) => {
            const i = pair.indexOf("=");
            return [pair.slice(0, i), pair.slice(i + 1)];
          })
        : [],
    );
    const href = buildHref(actionPath, extras, query);
    const timer = window.setTimeout(() => {
      router.replace(href, { scroll: false });
    }, 180);
    return () => window.clearTimeout(timer);
  }, [query, actionPath, extraKey, router]);

  return (
    <form
      className="search"
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      <label className="sr-only" htmlFor="app-search">
        {placeholder}
      </label>
      <input
        id="app-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
      />
    </form>
  );
}
