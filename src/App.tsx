import React, { useEffect, useRef, useState } from "react";

const LINE_HEIGHT = 22;
const MAX_ELEMENTS = 600;

export default function App() {
  const [documentHeight, setDocumentHeight] = useState(5000);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentDocHeight = documentHeight;

    const update = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const startY = windowHeight / 2;

      const minI = Math.max(0, Math.floor((scrollY - startY) / LINE_HEIGHT));
      const maxI =
        Math.ceil((scrollY + windowHeight - startY) / LINE_HEIGHT) - 1;

      const totalLines = maxI >= 0 ? maxI + 1 : 0;

      if (counterRef.current) {
        counterRef.current.innerText = totalLines.toString();
      }

      if (lineContainerRef.current) {
        const children = lineContainerRef.current.children;
        for (let i = 0; i < MAX_ELEMENTS; i++) {
          const el = children[i] as HTMLElement;
          if (!el) break;
          const lineIndex = minI + i;
          if (lineIndex <= maxI) {
            el.style.display = "block";
            const y = startY + lineIndex * LINE_HEIGHT - scrollY;
            el.style.transform = `translateY(${y}px)`;
          } else {
            el.style.display = "none";
          }
        }
      }

      if (scrollY + windowHeight > currentDocHeight - windowHeight * 2) {
        currentDocHeight += windowHeight * 10;
        setDocumentHeight(currentDocHeight);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const elements = Array.from({ length: MAX_ELEMENTS });

  return (
    <div
      style={{
        height: documentHeight,
        margin: 0,
        padding: 0,
        backgroundColor: "#fafafa",
        color: "#111",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          maxWidth: "calc(50vw - 64px)",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Dec-Line
        </div>
        <div
          ref={counterRef}
          style={{
            fontSize: 32,
            fontWeight: "bold",
            wordBreak: "break-all",
            lineHeight: 1.2,
          }}
        >
          0
        </div>
      </div>
      <div
        ref={lineContainerRef}
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          width: 20,
          pointerEvents: "none",
        }}
      >
        {elements.map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              textAlign: "center",
              height: LINE_HEIGHT,
              lineHeight: `${LINE_HEIGHT}px`,
              fontSize: "20px",
              display: "none",
              willChange: "transform",
            }}
          >
            |
          </div>
        ))}
      </div>
    </div>
  );
}
