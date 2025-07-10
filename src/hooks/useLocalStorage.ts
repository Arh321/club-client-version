import { useState, useEffect } from "react";

export const useLocalStorage = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any,
  isString: boolean
) => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = localStorage.getItem(key);
    if (stored) {
      console.log(stored);
      //   const parsedValue = isString ? stored : (JSON.parse(stored) as string);
      //   return parsedValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
