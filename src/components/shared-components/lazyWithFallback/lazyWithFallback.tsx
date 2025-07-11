// src/utils/lazy-with-fallback.tsx
import { lazy, Suspense, ComponentType } from "react";

type LazyWithFallbackOptions = {
  fallback: React.ReactNode;
};

export function lazyWithFallback<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyWithFallbackOptions
): ComponentType<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFn);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={options.fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
