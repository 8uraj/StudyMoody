import React, { useState } from 'react'

import { HomePageExplore as data } from "../../data/homepage-explore";
import Card from './Card';
import HighlightText from './HighlightText';
const tabNames=[
    "Free","New to coding","Most popular" ,"Skills paths","Career paths"
]
export default function ExploreMore() {
    const [index,setindex]=useState(0);

    function changeindex(e){
    //    alert(e.target.innerHTML);
       var newindex = tabNames.findIndex(function(element,index){
           return element==e.target.innerHTML;
       });

       
       setindex(newindex);
      
    }
  return (
    <div className="w-full py-6 md:py-0  md:w-[90%] m-auto flex flex-col gap-4">
      <div className="lg:relative lg:top-[80px] text-[2rem] font-semibold text-center">
        Unlock the <HighlightText>Power Of Code</HighlightText>
      </div>
      <div className="font-semibold lg:relative lg:top-[90px] text-center text-richblack-300">
        Learn to build anything you can imagine
      </div>
      <div className="flex flex-wrap min-w-[280px] w-[95%] lg:relative lg:top-[100px] md:w-fit m-auto md:px-10 justify-center items-center md:gap-14 h-fit max-h-[100px] bg-richblack-700 rounded-md p-1">
        {tabNames.map((tab, ind) => {
          return (
            <div
              onClick={changeindex}
              key={ind}
              className={`${
                ind === index ? "bg-black" : ""
              } px-3 py-2 my-1 md:min-w-[80px] text-center  hover:bg-black rounded-full`}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="w-full md:w-[90%] lg:relative lg:top-[200px] flex flex-wrap m-auto md:justify-around  justify-center gap-4 ">
        {data[index].courses.map((card,ind) => {
          return <Card card={card} key={ind} />;
        })}
      </div>
    </div>
  );
}
