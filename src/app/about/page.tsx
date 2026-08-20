import type { Metadata } from "next";
import { AboutView } from "@/components/AboutView";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/request-lang";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const dict = getDictionary(lang);
  return {
    title: {
      absolute: `${dict.brand} - ${dict.about}`,
    },
  };
}

export default function AboutPage() {
  return <AboutView />;
}
