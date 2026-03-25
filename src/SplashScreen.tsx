import React, { useEffect, useState } from "react";

export default function SplashScreen() {
  const [splashState, setSplashState] = useState<
    "visible" | "splitting" | "hidden"
  >("visible");

  useEffect(() => {
    if (splashState !== "hidden") {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [splashState]);

  useEffect(() => {
    const splitTimer = setTimeout(() => {
      setSplashState("splitting");

      const hideTimer = setTimeout(() => {
        setSplashState("hidden");
      }, 1000);

      return () => clearTimeout(hideTimer);
    }, 1500);

    return () => clearTimeout(splitTimer);
  }, []);

  if (splashState === "hidden") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        fontFamily: "'Helvetica Neue', Inter, system-ui, sans-serif",
        fontWeight: 900,
        textTransform: "uppercase",
        color: "#0a0a0a",
        pointerEvents: splashState === "splitting" ? "none" : "auto",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          transition: "transform 1s cubic-bezier(0.77, 0, 0.175, 1)",
          transform:
            splashState === "splitting" ? "translateY(-100%)" : "translateY(0)",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontSize: "28vw",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          DEC-
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          transition: "transform 1s cubic-bezier(0.77, 0, 0.175, 1)",
          transform:
            splashState === "splitting" ? "translateY(100%)" : "translateY(0)",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontSize: "28vw",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          LINE
        </span>
      </div>
    </div>
  );
}
