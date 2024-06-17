import React from "react";

export default function HighlightTextPurple({ children, size }) {
  return (
    <span
      className={` bg-gradient-to-b from-[#1f6aff] via-[#1248d1] to-[#2b3ea2] text-transparent bg-clip-text font-bold 
    
    `}
    >
      {children}
    </span>
  );
}
