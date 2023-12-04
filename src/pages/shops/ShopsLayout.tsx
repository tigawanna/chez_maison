
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../shared/hooks/useDocumentTitle";
import { AppUser } from "../../state/types/base";
interface ShopsLayoutProps {
  user:AppUser
}

export default function ShopsLayout({}:ShopsLayoutProps){
  useDocumentTitle('Shops')
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


