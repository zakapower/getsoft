import { AppCard } from "@/components/AppCard";
import { getFeaturedApps, searchApps } from "@/data/apps";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/request-lang";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const lang = await getRequestLang();
  const dict = getDictionary(lang);
  const { q = "" } = await searchParams;
  const list = q ? searchApps(q) : getFeaturedApps();

  return (
    <div className="app-list" key={q || "featured"}>
      {list.map((app) => (
        <AppCard key={app.slug} app={app} dict={dict} />
      ))}
    </div>
  );
}
