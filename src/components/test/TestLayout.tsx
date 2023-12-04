import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppUser } from '../../state/types/base';

interface TestLayoutProps {
  user:AppUser
}

export default function TestLayout(){
return (
<div>
    <Outlet />
  </div>)
}
