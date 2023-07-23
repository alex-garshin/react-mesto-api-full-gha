import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleSize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return width <= 568;
};
