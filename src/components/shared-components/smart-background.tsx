"use client";
import React, { useEffect, useState } from "react";

interface SmartBackgroundProps {
  externalUrl: string;
  fallbackUrl: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const SmartBackground: React.FC<SmartBackgroundProps> = ({
  externalUrl,
  fallbackUrl,
  className = "",
  style = {},
  children,
}) => {
  const [bgUrl, setBgUrl] = useState<string>("");

  useEffect(() => {
    // اول امتحان می‌کنیم که external تصویر قابل لود هست یا نه
    const img = new Image();
    img.src = externalUrl;
    img.onload = () => setBgUrl(externalUrl);
    img.onerror = () => setBgUrl(fallbackUrl);
  }, [externalUrl, fallbackUrl]);

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SmartBackground;
