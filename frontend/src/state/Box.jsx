import React, { useLayoutEffect, useRef, useState } from "react";

function Box() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      const box = boxRef.current;
      if (box) {
        const rect = box.getBoundingClientRect();
        setWidth(rect.width);
      }
    };

    updateWidth(); // Run on first render

    window.addEventListener("resize", updateWidth); // Update on resize

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div
        ref={boxRef}
        style={{
          width: "50%",
          border: "2px solid black",
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: "#f0f0f0",
        }}
      >
        Resize the browser window to change my width!
      </div>
      <p> Current width: <strong>{width}px</strong></p>
    </div>
  );
}

export default Box;
