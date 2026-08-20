import type { Lang } from "@/lib/lang";

export const categoryIds = [
  "browsers",
  "communication",
  "media",
  "utilities",
  "developer",
  "gaming",
] as const;

export type CategoryId = (typeof categoryIds)[number];

export const categoryLabels: Record<
  CategoryId,
  Record<Lang, string>
> = {
  browsers: { ru: "Браузеры", en: "Browsers" },
  communication: { ru: "Связь", en: "Communication" },
  media: { ru: "Медиа", en: "Media" },
  utilities: { ru: "Утилиты", en: "Utilities" },
  developer: { ru: "Для разработчиков", en: "Developer" },
  gaming: { ru: "Игры", en: "Gaming" },
};
