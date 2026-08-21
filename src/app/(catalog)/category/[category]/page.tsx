import { notFound } from "next/navigation";
import { AppGrid } from "@/components/AppGrid";
import { getAppsByCategory, searchApps } from "@/data/apps";
import { categoryIds, type CategoryId } from "@/data/categories";

export function generateStaticParams() {
  return categoryIds.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category: categoryRaw } = await params;
  if (!categoryIds.includes(categoryRaw as CategoryId)) notFound();

  const category = categoryRaw as CategoryId;
  const { q = "" } = await searchParams;

  const inCategory = getAppsByCategory(category);
  const list = q
    ? searchApps(q).filter((app) => app.category === category)
    : inCategory;

  return <AppGrid apps={list} listKey={`${category}:${q}`} />;
}
