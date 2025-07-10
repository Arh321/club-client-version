"use client";
import AppLoading from "@/app/loading";
import { usePathname } from "next/navigation";
import React, { useTransition } from "react";

export function LoadingIndicator({
  component,
}: {
  component: React.JSX.Element;
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname(); // Reactively tracks the current route.
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    startTransition(() => {
      setShouldRender(true);
    });
  }, [pathname]);

  return (
    <div className="h-full w-full flex flex-col bg-cta overflow-hidden">
      {isPending || (!shouldRender && <AppLoading />)}
      {component}
    </div>
  );
}
