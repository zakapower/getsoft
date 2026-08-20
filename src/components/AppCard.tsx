import { Download } from "lucide-react";
import type { AppEntry } from "@/data/apps";
import type { Dictionary } from "@/i18n/dictionaries";
import { AppIcon } from "./AppIcon";

type Props = {
  app: AppEntry;
  dict: Dictionary;
};

export function AppCard({ app, dict }: Props) {
  return (
    <article className="app-row">
      <AppIcon app={app} />
      <div className="app-row__body">
        <span className="app-row__name">{app.name}</span>
      </div>
      <a
        className="btn btn--sm"
        href={app.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download className="btn__icon" strokeWidth={2.25} aria-hidden />
        {dict.download}
      </a>
    </article>
  );
}
