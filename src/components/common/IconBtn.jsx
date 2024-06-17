import React from "react";

export default function IconBtn({
  text,
  onClick,
  children,
  disabled,
  ouline = false,
  customClasses,
  type,
  active,
}) {
  return (
    <button
      className={` ${customClasses?customClasses:""} ${
        active ? "bg-yellow-50 text-black" : "bg-richblack-500"
      } p-2 px-4 rounded-lg `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}{children}
    </button>
  );
}
