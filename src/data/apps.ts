import type { CategoryId } from "./categories";

export type AppEntry = {
  slug: string;
  name: string;
  category: CategoryId;
  publisher: string;
  officialUrl: string;
  featured?: boolean;
};

export const apps: AppEntry[] = [
  {
    slug: "chrome",
    name: "Google Chrome",
    category: "browsers",
    publisher: "Google",
    officialUrl: "https://www.google.com/chrome/",
    featured: true,
  },
  {
    slug: "firefox",
    name: "Mozilla Firefox",
    category: "browsers",
    publisher: "Mozilla",
    officialUrl: "https://www.mozilla.org/firefox/",
    featured: true,
  },
  {
    slug: "edge",
    name: "Microsoft Edge",
    category: "browsers",
    publisher: "Microsoft",
    officialUrl: "https://www.microsoft.com/edge",
  },
  {
    slug: "brave",
    name: "Brave",
    category: "browsers",
    publisher: "Brave Software",
    officialUrl: "https://brave.com/download/",
  },
  {
    slug: "yandex",
    name: "Яндекс Браузер",
    category: "browsers",
    publisher: "Yandex",
    officialUrl: "https://browser.yandex.ru/",
  },
  {
    slug: "opera",
    name: "Opera",
    category: "browsers",
    publisher: "Opera Software",
    officialUrl: "https://www.opera.com/download",
  },
  {
    slug: "discord",
    name: "Discord",
    category: "communication",
    publisher: "Discord",
    officialUrl: "https://discord.com/download",
    featured: true,
  },
  {
    slug: "telegram",
    name: "Telegram Desktop",
    category: "communication",
    publisher: "Telegram FZ-LLC",
    officialUrl: "https://desktop.telegram.org/",
    featured: true,
  },
  {
    slug: "whatsapp",
    name: "WhatsApp Desktop",
    category: "communication",
    publisher: "Meta",
    officialUrl: "https://www.whatsapp.com/download",
  },
  {
    slug: "vlc",
    name: "VLC media player",
    category: "media",
    publisher: "VideoLAN",
    officialUrl: "https://www.videolan.org/vlc/",
    featured: true,
  },
  {
    slug: "spotify",
    name: "Spotify",
    category: "media",
    publisher: "Spotify",
    officialUrl: "https://www.spotify.com/download/windows/",
    featured: true,
  },
  {
    slug: "obs",
    name: "OBS Studio",
    category: "media",
    publisher: "OBS Project",
    officialUrl: "https://obsproject.com/download",
  },
  {
    slug: "blender",
    name: "Blender",
    category: "media",
    publisher: "Blender Foundation",
    officialUrl: "https://www.blender.org/download/",
  },
  {
    slug: "7zip",
    name: "7-Zip",
    category: "utilities",
    publisher: "Igor Pavlov",
    officialUrl: "https://www.7-zip.org/",
    featured: true,
  },
  {
    slug: "winrar",
    name: "WinRAR",
    category: "utilities",
    publisher: "win.rar GmbH",
    officialUrl: "https://www.win-rar.com/download.html",
  },
  {
    slug: "everything",
    name: "Everything",
    category: "utilities",
    publisher: "voidtools",
    officialUrl: "https://www.voidtools.com/",
  },
  {
    slug: "qbittorrent",
    name: "qBittorrent",
    category: "utilities",
    publisher: "The qBittorrent project",
    officialUrl: "https://www.qbittorrent.org/download",
  },
  {
    slug: "rufus",
    name: "Rufus",
    category: "utilities",
    publisher: "Pete Batard",
    officialUrl: "https://rufus.ie/",
  },
  {
    slug: "revo",
    name: "Revo Uninstaller",
    category: "utilities",
    publisher: "VS Revo Group",
    officialUrl: "https://www.revouninstaller.com/revo-uninstaller-free-download/",
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: "developer",
    publisher: "Anysphere",
    officialUrl: "https://cursor.com/download",
    featured: true,
  },
  {
    slug: "vscode",
    name: "Visual Studio Code",
    category: "developer",
    publisher: "Microsoft",
    officialUrl: "https://code.visualstudio.com/",
    featured: true,
  },
  {
    slug: "webstorm",
    name: "WebStorm",
    category: "developer",
    publisher: "JetBrains",
    officialUrl: "https://www.jetbrains.com/webstorm/download/",
  },
  {
    slug: "androidstudio",
    name: "Android Studio",
    category: "developer",
    publisher: "Google",
    officialUrl: "https://developer.android.com/studio",
  },
  {
    slug: "githubdesktop",
    name: "GitHub Desktop",
    category: "developer",
    publisher: "GitHub",
    officialUrl: "https://desktop.github.com/",
  },
  {
    slug: "figma",
    name: "Figma",
    category: "developer",
    publisher: "Figma",
    officialUrl: "https://www.figma.com/downloads/",
  },
  {
    slug: "git",
    name: "Git",
    category: "developer",
    publisher: "Git SCM",
    officialUrl: "https://git-scm.com/download/win",
    featured: true,
  },
  {
    slug: "notepadpp",
    name: "Notepad++",
    category: "developer",
    publisher: "Don Ho",
    officialUrl: "https://notepad-plus-plus.org/downloads/",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    category: "developer",
    publisher: "OpenJS Foundation",
    officialUrl: "https://nodejs.org/en/download",
  },
  {
    slug: "python",
    name: "Python",
    category: "developer",
    publisher: "Python Software Foundation",
    officialUrl: "https://www.python.org/downloads/",
  },
  {
    slug: "steam",
    name: "Steam",
    category: "gaming",
    publisher: "Valve",
    officialUrl: "https://store.steampowered.com/about/",
    featured: true,
  },
  {
    slug: "epic",
    name: "Epic Games",
    category: "gaming",
    publisher: "Epic Games",
    officialUrl: "https://store.epicgames.com/download",
    featured: true,
  },
  {
    slug: "battlenet",
    name: "Battle.net",
    category: "gaming",
    publisher: "Blizzard Entertainment",
    officialUrl: "https://battle.net/download",
    featured: true,
  },
  {
    slug: "ubisoft",
    name: "Ubisoft Connect",
    category: "gaming",
    publisher: "Ubisoft",
    officialUrl: "https://ubisoftconnect.com/en-US/download",
    featured: true,
  },
  {
    slug: "ea",
    name: "EA app",
    category: "gaming",
    publisher: "Electronic Arts",
    officialUrl: "https://www.ea.com/ea-app",
    featured: true,
  },
  {
    slug: "rockstar",
    name: "Rockstar Games Launcher",
    category: "gaming",
    publisher: "Rockstar Games",
    officialUrl: "https://www.rockstargames.com/downloads",
  },
  {
    slug: "anydesk",
    name: "AnyDesk",
    category: "utilities",
    publisher: "AnyDesk Software",
    officialUrl: "https://anydesk.com/en/downloads/windows",
  },
  {
    slug: "geekuninstaller",
    name: "Geek Uninstaller",
    category: "utilities",
    publisher: "Thomas Koen",
    officialUrl: "https://geekuninstaller.com/download",
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    category: "utilities",
    publisher: "Cloudflare",
    officialUrl: "https://1.1.1.1/",
  },
  {
    slug: "windhawk",
    name: "Windhawk",
    category: "utilities",
    publisher: "Ramen Software",
    officialUrl: "https://windhawk.net/",
  },
  {
    slug: "v2raytun",
    name: "v2RayTun",
    category: "utilities",
    publisher: "LXST-CODE",
    officialUrl: "https://v2raytun.com/",
  },
];


export function getAppsByCategory(category: CategoryId): AppEntry[] {
  return apps.filter((app) => app.category === category);
}

export function getFeaturedApps(): AppEntry[] {
  return apps.filter((app) => app.featured);
}

export function searchApps(query: string): AppEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return apps;
  return apps.filter(
    (app) =>
      app.name.toLowerCase().includes(q) ||
      app.publisher.toLowerCase().includes(q) ||
      app.slug.includes(q),
  );
}
