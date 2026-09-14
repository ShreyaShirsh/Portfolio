import { useEffect, useState } from "react";

// True only for devices with an actual mouse/trackpad (not touch), so the
// custom cursor and cursor-following interactions never activate on
// phones/tablets.
export function useIsFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setIsFine(query.matches);
    const handler = (e) => setIsFine(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isFine;
}
