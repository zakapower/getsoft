import { AppCard } from "@/components/AppCard";
import { apps, searchApps } from "@/data/apps";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const list = q ? searchApps(q) : apps;

  return (
    <div className="app-list" key={q || "all"}>
      {list.map((app) => (
        <AppCard key={app.slug} app={app} />
      ))}
    </div>
  );
}
