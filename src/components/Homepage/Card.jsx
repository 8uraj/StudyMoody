import React, { useState } from 'react'
import { IoPeople } from "react-icons/io5";
import { IoDocumentsOutline } from "react-icons/io5";
export default function Card({card}) {
  const[currcard,setcurrcard]=useState(0);
  return (
    <div className="rounded-lg aspect-square min-w-[300px] aspect-retangle w-[30%] flex flex-col justify-center gap-3 flex-wrap bg-richblack-800 px-6 hover:scale-105 transition-all duration-1000">
      <div className="h-[25%] font-semibold text-[1.4rem]">{card.heading}</div>
      <div className="h-[40%]">{card.description}</div>
      <hr></hr>
      <div className=" flex justify-between px-2 border-t-solid border-t-white">
        <div className='flex items-center gap-1'>
          <IoPeople /> {card.level}{" "}
        </div>
        <div className='flex items-center gap-1'>
          <IoDocumentsOutline />
          {card.lessionNumber} Lessions{" "}
        </div>
      </div>
    </div>
  );
}
