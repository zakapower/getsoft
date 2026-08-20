import type { Metadata } from "next";
import { IBM_Plex_Sans, Literata } from "next/font/google";
import { DocumentTitle } from "@/components/DocumentTitle";
import { Header } from "@/components/Header";
import { OverlayScrollbar } from "@/components/OverlayScrollbar";
import { AppProvider } from "@/context/AppContext";
import { getRequestLang } from "@/lib/request-lang";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const display = Literata({
  variable: "--font-display-face",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    default: "Getsoft",
    template: "%s · Getsoft",
  },
  icons: {},
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getRequestLang();

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          id="site-favicon"
          rel="icon"
          type="image/svg+xml"
          href="/favicon-dark.svg?v=5"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('getsoft-theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.removeAttribute('data-theme')}document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon']").forEach(function(n){if(n.id!=='site-favicon')n.remove()});var icon=document.getElementById('site-favicon');if(icon){icon.href=t==='dark'?'/favicon-dark.svg?v=5':'/favicon-light.svg?v=5'}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AppProvider initialLang={lang}>
          <DocumentTitle />
          <OverlayScrollbar />
          <div className="app-shell">
            <Header />
            <main>{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
