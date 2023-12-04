
import { Outlet } from "react-router-dom";
interface PrintLayoutProps {

}

export default function PrintLayout({}:PrintLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


