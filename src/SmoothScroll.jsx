import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;

    const start = () => {
      if (reducedMotion.matches || lenis) return;

      lenis = new Lenis({
        autoRaf: true,
        anchors: true,
      });
    };

    const stop = () => {
      lenis?.destroy();
      lenis = undefined;
    };

    const onPreferenceChange = () => {
      if (reducedMotion.matches) stop();
      else start();
    };

    start();
    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      reducedMotion.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  return null;
}
