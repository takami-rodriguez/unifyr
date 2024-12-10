import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({} as WindowSize);

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: window.innerWidth < 640,
      tablet: window.innerWidth < 1024 && window.innerWidth >= 640,
      desktop: window.innerWidth > 1024,
    });
  };

  useEffect(() => {
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
