import React from "react";

export default function HighlightTextRed({ children, size }) {
  return (
    <span
      className={` bg-gradient-to-b from-[#ff351f] via-[#fa7e12] to-[#b0d21a] text-transparent bg-clip-text font-bold 
    
    `}
    >
      {children}
    </span>
  );
}
