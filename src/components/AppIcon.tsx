import type { AppEntry } from "@/data/apps";

/** Monochrome logos stored as white; inverted in light theme. */
const MONO_ICONS = new Set(["7zip", "steam", "epic", "obs", "cursor", "windhawk"]);

type Props = {
  app: AppEntry;
};

export function AppIcon({ app }: Props) {
  const mono = MONO_ICONS.has(app.slug);

  return (
    <span
      className={mono ? "app-row__icon app-row__icon--mono" : "app-row__icon"}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${app.slug}.svg`}
        alt=""
        width={28}
        height={28}
        className="app-icon__img"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
