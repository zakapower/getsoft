import type { AppEntry } from "@/data/apps";
import { apps } from "@/data/apps";
import { categoryIds } from "@/data/categories";

export const sortIds = ["name", "category", "recent"] as const;
export type SortId = (typeof sortIds)[number];

const catalogIndex = new Map(apps.map((app, i) => [app.slug, i]));
const categoryIndex = new Map(categoryIds.map((id, i) => [id, i]));

export function parseSort(value: string | null | undefined): SortId {
  if (value === "name" || value === "category" || value === "recent") {
    return value;
  }
  return "name";
}

export function sortApps(list: AppEntry[], sort: SortId): AppEntry[] {
  const next = [...list];
  if (sort === "name") {
    next.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );
  } else if (sort === "category") {
    next.sort((a, b) => {
      const ca = categoryIndex.get(a.category) ?? 0;
      const cb = categoryIndex.get(b.category) ?? 0;
      if (ca !== cb) return ca - cb;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
  } else {
    next.sort(
      (a, b) => (catalogIndex.get(b.slug) ?? 0) - (catalogIndex.get(a.slug) ?? 0),
    );
  }
  return next;
}
