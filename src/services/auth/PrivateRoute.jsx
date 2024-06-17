import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);

    if(token!==null){
        return children;
    }
    else{
        return <navigate to="/login" />
    }
  
}
