import { useEffect, useRef } from "react";

/**
 * Custom hook to run a callback function at a specified interval.
 *
 * @param callback - The function to be executed at each interval.
 * @param delay - The delay (in milliseconds) between each interval execution. Pass null to pause the interval.
 * @param active - Boolean to determine whether the interval is active or not.
 */
const useInterval = (
  callback: () => void,
  delay: number | null,
  active: boolean = true
) => {
  const savedCallback = useRef<() => void>();

  // Save the latest callback function
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active || delay === null) return;

    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id); // Cleanup on component unmount or delay change
  }, [delay, active]);
};

export default useInterval;
