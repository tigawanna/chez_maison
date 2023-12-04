import { Link } from "react-router-dom";
import { TenantShops } from "./TenantShops";
import { TenantResponse } from "../../state/api/tenant";
import { MutateShop } from "../shops/MutateShop";
import { AppUser } from "../../state/types/base";
import { FaRegEdit } from "react-icons/fa";


interface TenantCardProps {
tenant:TenantResponse
user:AppUser
}

export function TenantCard({tenant,user}:TenantCardProps){
return (
    <div
        key={tenant.id}
        className='w-full p-2 md:w-[30%] h-full flex flex-col items-center justify-center border-shadow gap-2'>
        <Link to={``}
            className='w-full h-full flex flex-col items-center justify-center gap-2 rounded-xl hover:text-purple-500'>
            {/*top  */}
            <div className="w-full flex justify-between items-center  px-2 gap-2">
                <h2 className="font-bold ">{tenant.name}</h2>
                <h2 className="">{tenant.details}</h2>
            </div>

            {/*body */}

        </Link>
        <div className="w-full flex  justify-between items-center px-2">
            <TenantShops tenant={tenant} />
             <MutateShop user={user} tenant={tenant} 
             custom_icon={{
                 Icon:FaRegEdit,
                 size:'20'
             }}
             />
        </div>
    </div>
);
}
