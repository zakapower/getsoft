"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `${actionPath}?q=${encodeURIComponent(q)}` : actionPath);
  }

  return (
    <form className="search" onSubmit={onSubmit} role="search">
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
