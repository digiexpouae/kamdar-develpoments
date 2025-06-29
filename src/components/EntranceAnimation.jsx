import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const EntranceAnimation = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Only show animation if not already shown this session
    if (window.sessionStorage.getItem("entrancePlayed")) {
      setShow(false);
      if (onComplete) onComplete();
      return;
    }

    // Animate logo (pulse/scale)
    gsap.to(logoRef.current, {
      scale: 1.15,
      repeat: -1,
      yoyo: true,
      duration: 0.7,
      ease: "power1.inOut",
    });

    // Wait 3-5 seconds, then fade out overlay
    const delay = Math.random() * 2 + 3; // 3 to 5 seconds
    const overlay = overlayRef.current;
    const timeout = setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setShow(false);
          window.sessionStorage.setItem("entrancePlayed", "true");
          if (onComplete) onComplete();
        },
      });
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "opacity 0.8s",
      }}
    >
      <img
        ref={logoRef}
        src="/assets/logo.png"
        alt="Logo"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "contain",
          userSelect: "none",
        }}
      />
    </div>
  );
};

export default EntranceAnimation;
