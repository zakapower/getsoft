import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, resolveLang } from "@/lib/lang";

function stripLocalePrefix(pathname: string): string | null {
  const match = pathname.match(/^\/(ru|en)(?=\/|$)/);
  if (!match) return null;
  const rest = pathname.slice(match[0].length);
  return rest.length === 0 ? "/" : rest;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const stripped = stripLocalePrefix(pathname);

  if (stripped !== null) {
    const locale = pathname.split("/")[1];
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    const response = NextResponse.redirect(url);
    if (locale === "ru" || locale === "en") {
      response.cookies.set(LANG_COOKIE, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  const queryLang = request.nextUrl.searchParams.get("lang");
  const cookieLang = request.cookies.get(LANG_COOKIE)?.value;
  const acceptLanguage = request.headers.get("accept-language");
  const lang = resolveLang({ queryLang, cookieLang, acceptLanguage });

  const response = NextResponse.next();
  if (request.cookies.get(LANG_COOKIE)?.value !== lang) {
    response.cookies.set(LANG_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.svg|favicon-dark\\.svg|favicon-light\\.svg|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|woff2)$).*)",
  ],
};
