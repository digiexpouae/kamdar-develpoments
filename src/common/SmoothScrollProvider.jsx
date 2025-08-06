import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    import("gsap/ScrollTrigger").then((module) => {
      const ScrollTrigger = module.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        smooth: true,
        lerp: 0.08,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Connect Lenis with GSAP ScrollTrigger
      ScrollTrigger.scrollerProxy(document.body, {
        
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? "transform" : "fixed",
      });

      lenis.on("scroll", ScrollTrigger.update);
      // ✅ Removed .update() call — Lenis has no update() method

      ScrollTrigger.refresh();

      return () => {
        lenis.destroy();
        ScrollTrigger.kill();
      };
    });
  }, []);

  return children;
}
