import { Suspense } from "react";
import { CatalogChrome } from "@/components/CatalogChrome";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <CatalogChrome>{children}</CatalogChrome>
    </Suspense>
  );
}
