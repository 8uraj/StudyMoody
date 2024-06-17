import React from 'react'
import("../Loader.css");
export default function Loading() {
  return (
    <div className="m-auto absolute left-[50%] top-[50%] text-white flex flex-col gap-16">
      <div className="loader my-8"></div>
     
    </div>
  );
}
