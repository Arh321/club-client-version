import { useEffect, useRef } from "react";

const useInfiniteScrollToElement = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any,
  callback: () => void,
  hasMore: boolean,
  isFetching: boolean,
  delay = 100,
  scrollContainerId?: string // Optional container ID to attach scroll event
) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : window;

    if (!scrollContainer && scrollContainerId) {
      console.warn(`Container with id "${scrollContainerId}" not found`);
      return;
    }

    const handleScroll = () => {
      if (!ref.current || isFetching) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const bottom = ref.current.getBoundingClientRect();
        const containerHeight = scrollContainerId
          ? (scrollContainer as HTMLElement).clientHeight
          : window.innerHeight;

        // اگر فاصله‌ی پایین المنت از بالای ویوپورت کمتر از یه حدی بود:
        if (bottom["bottom"] <= containerHeight + 100 && hasMore) {
          callback();
        }
      }, delay);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [ref, callback, hasMore, scrollContainerId]);
};

export default useInfiniteScrollToElement;
