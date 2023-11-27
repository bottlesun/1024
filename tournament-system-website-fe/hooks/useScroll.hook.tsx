import { useEffect, useState } from "react";

export type UseScrollHook = {
  scrollY: number;
  scrollX: number;
};

const useScrollHook = (): UseScrollHook => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollX, setScrollX] = useState<number>(0);

  useEffect((): (() => void) => {
    let mounted = true;
    window.addEventListener("scroll", (): void => {
      if (mounted) {
        setScrollX(window.scrollX);
        setScrollY(window.scrollY);
      }
    });

    return (): void => {
      mounted = false;
      // window.removeEventListener('scroll', debounce(listener, delay));
    };
  }, []);

  return {
    scrollX,
    scrollY
  };
};

export default useScrollHook;
