import { notFound } from "next/navigation";
import { AppCard } from "@/components/AppCard";
import { getAppsByCategory, searchApps } from "@/data/apps";
import { categoryIds, type CategoryId } from "@/data/categories";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/request-lang";

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

  const lang = await getRequestLang();
  const category = categoryRaw as CategoryId;
  const dict = getDictionary(lang);
  const { q = "" } = await searchParams;

  const inCategory = getAppsByCategory(category);
  const list = q
    ? searchApps(q).filter((app) => app.category === category)
    : inCategory;

  return (
    <div className="app-list" key={`${category}:${q}`}>
      {list.map((app) => (
        <AppCard key={app.slug} app={app} dict={dict} />
      ))}
    </div>
  );
}
