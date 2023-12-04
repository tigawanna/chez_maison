
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../shared/hooks/useDocumentTitle";
import { AppUser } from "../../state/types/base";
interface TenantsLayoutProps {
user:AppUser
}

export default function TenantsLayout({}:TenantsLayoutProps){
  useDocumentTitle('Tenants')
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


