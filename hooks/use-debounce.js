import { useState, useEffect } from "react";

export function useDebounce({ value, delay }) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setInterval(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
