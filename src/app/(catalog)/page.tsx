import { AppGrid } from "@/components/AppGrid";
import { apps, searchApps } from "@/data/apps";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const list = q ? searchApps(q) : apps;

  return <AppGrid apps={list} listKey={q || "all"} />;
}
