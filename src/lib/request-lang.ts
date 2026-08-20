import { cookies, headers } from "next/headers";
import { LANG_COOKIE, resolveLang, type Lang } from "./lang";

export async function getRequestLang(): Promise<Lang> {
  const jar = await cookies();
  const headerStore = await headers();
  return resolveLang({
    cookieLang: jar.get(LANG_COOKIE)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
}
