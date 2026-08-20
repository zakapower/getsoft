"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  placeholder: string;
  initialQuery?: string;
  actionPath?: string;
};

export function SearchBox({
  placeholder,
  initialQuery = "",
  actionPath = "/",
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = query.trim();
    const href = q ? `${actionPath}?q=${encodeURIComponent(q)}` : actionPath;
    const timer = window.setTimeout(() => {
      router.replace(href, { scroll: false });
    }, 180);
    return () => window.clearTimeout(timer);
  }, [query, actionPath, router]);

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
