"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

type AntdLazyImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loadingPriority?: boolean;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  onLoad?: () => void;
};

const AntdLazyImage: React.FC<AntdLazyImageProps> = ({
  src,
  alt = "",
  className = "",
  style = {},
  loadingPriority = false,
  width,
  height,
  fallback = "/placeholder.webp",
  onLoad,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(loadingPriority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(fallback);
  const [shouldRenderImage, setShouldRenderImage] = useState(loadingPriority);

  // 🔎 Check if src is a valid URL
  const isValidUrl = (url?: string) => {
    try {
      new URL(url || "");
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!src || !isValidUrl(src)) {
      setCurrentSrc(fallback);
      setHasError(true);
      return;
    }

    if (loadingPriority) {
      setCurrentSrc(src);
      setShouldRenderImage(true);

      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShouldRenderImage(true);
          setCurrentSrc(src);
          observer.unobserve(entry.target);
        }
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src, fallback, loadingPriority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setCurrentSrc(fallback);
    setIsLoaded(false);
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      key={src}
      style={{ width, height, position: "relative", ...style }}
      className={clsx("overflow-hidden", className)}
    >
      {/* 🔄 Skeleton Loader */}
      {!isLoaded && !hasError && (
        <div
          className="!flex !w-full !h-full rounded-[10px] animate-skeleton"
          style={{ position: "absolute", inset: 0 }}
        />
      )}

      {/* ✅ Main Image */}
      {shouldRenderImage && !hasError && (
        <Image
          src={currentSrc}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          className={clsx(
            "object-cover transition-opacity duration-500 mainImage",
            {
              "opacity-0": !isLoaded,
              "opacity-100": isLoaded,
            }
          )}
          loading={loadingPriority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* 🛑 Error Fallback */}
      {hasError && (
        <Image
          src={fallback}
          alt="fallback"
          width={100}
          height={100}
          className="w-full h-full object-cover bg-cta-disabled rounded-[6px] "
          style={{ position: "absolute", inset: 0 }}
        />
      )}
    </div>
  );
};

export default AntdLazyImage;
