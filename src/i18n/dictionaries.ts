import type { Lang } from "@/lib/lang";

const dictionaries = {
  ru: {
    brand: "Getsoft",
    tagline: "Официальные загрузки Windows в одном месте",
    searchPlaceholder: "Найти программу…",
    popular: "Приложения",
    categories: "Категории",
    categoriesAll: "Все",
    favorites: "Избранное",
    sortLabel: "Сортировка",
    sortName: "По имени",
    sortCategory: "По категории",
    sortRecent: "Сначала новые",
    download: "Скачать",
    about: "О проекте",
    aboutLead: "Зачем нужен Getsoft и чем он не является.",
    aboutWhatTitle: "Что это",
    aboutWhatP1:
      "Getsoft — каталог популярных программ для Windows. Вместо того чтобы искать сайт каждого издателя, вы открываете карточку и сразу переходите на официальную страницу загрузки.",
    aboutWhatP2:
      "Это не магазин приложений и не зеркало установщиков: мы не продаём софт и не храним чужие файлы у себя.",
    aboutSafeTitle: "Безопасность",
    aboutSafeP1:
      "Кнопка «Скачать» ведёт на официальный сайт или CDN издателя. Так меньше риска подмены установщика и «серых» сборок.",
    aboutSafeP2:
      "Перед установкой всё равно сверяйте адрес сайта и цифровую подпись файла, если издатель её публикует.",
    aboutSourceTitle: "Исходный код",
    aboutSourceP1:
      "Getsoft — свободный проект с открытым исходным кодом. Репозиторий, ошибки и предложения на GitHub.",
    aboutCtaApps: "Список программ и поиск",
    aboutCtaGithub: "Код, ошибки и идеи",
  },
  en: {
    brand: "Getsoft",
    tagline: "Official Windows downloads in one place",
    searchPlaceholder: "Search apps…",
    popular: "Apps",
    categories: "Categories",
    categoriesAll: "All",
    favorites: "Favorites",
    sortLabel: "Sort",
    sortName: "By name",
    sortCategory: "By category",
    sortRecent: "Newest first",
    download: "Download",
    about: "About",
    aboutLead: "What Getsoft is for and what it is not.",
    aboutWhatTitle: "What this is",
    aboutWhatP1:
      "Getsoft is a catalog of popular Windows apps. Instead of hunting each publisher’s site, open a card and go straight to the official download page.",
    aboutWhatP2:
      "This is not an app store and not a mirror of installers: we don’t sell software or host someone else’s files.",
    aboutSafeTitle: "Safety",
    aboutSafeP1:
      "Download opens the publisher’s official site or CDN. That lowers the risk of swapped installers and shady builds.",
    aboutSafeP2:
      "Still check the site URL and the file signature when the publisher provides one.",
    aboutSourceTitle: "Source",
    aboutSourceP1:
      "Getsoft is free and open source. The repository, issues, and ideas are on GitHub.",
    aboutCtaApps: "App list and search",
    aboutCtaGithub: "Code, issues, and ideas",
  },
} as const;

export type Dictionary = {
  [K in keyof (typeof dictionaries)["ru"]]: string;
};

export function getDictionary(locale: Lang): Dictionary {
  return dictionaries[locale];
}
