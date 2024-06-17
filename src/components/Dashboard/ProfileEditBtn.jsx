import React from 'react'
import { FiEdit } from "react-icons/fi";

import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function ProfileEditBtn({ text, customClasses }) {
  return (
    <Link to="/dashboard/setting" className={`text-black items-center font-semibold rounded-md flex gap-2 bg-yellow-50 ${customClasses?customClasses:""}`}>
      <span>{text}</span>
      {text === "Edit" ? <FiEdit /> : <IoIosAddCircleOutline />}
    </Link>
  );
}
