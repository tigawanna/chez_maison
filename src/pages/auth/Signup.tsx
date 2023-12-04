import React from 'react';
import { Link } from 'react-router-dom';
import { AppUser } from '../../state/types/base';


interface SignupProps {
  user:AppUser
}

export default function Signup({user}: SignupProps){

 return (
    <div className="w-full h-[80%] flex flex-col items-center justify-center">
      <div className="w-[80%] h-fit md:w-[60%]  m-2 flex flex-col
    items-center justify-center "
      />
      <Link
        to="/auth"
        className="text-blue-500"
      >
        Already have an account?, go to login
      </Link>
    </div>
  );
  }
