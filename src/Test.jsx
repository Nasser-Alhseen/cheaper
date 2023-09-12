import React, { useState } from "react";
import "./test.css"; // Import the CSS file for styling

const Test = () => {
  const [isGlued, setIsGlued] = useState(false);
  const [gluePosition, setGluePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const position = { x, y };
    setGluePosition(position);
  };

  const handleMouseEnter = () => {
    setIsGlued(true);
  };

  const handleMouseLeave = () => {
    setIsGlued(false);
  };

  return (
    <div className={`glue-element ${isGlued ? "glued" : ""}`} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isGlued && <div className="glue-effect" style={{ left: gluePosition.x, top: gluePosition.y }}></div>}
      <h1>Hover over me</h1>
    </div>
  );
};

export default Test;
