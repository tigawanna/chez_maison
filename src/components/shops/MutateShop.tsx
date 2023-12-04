import { useState } from "react";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { ShopResponse } from "../../state/api/shops";
import { TenantResponse } from "../../state/api/tenant";
import { AppUser } from "../../state/types/base";
import { ShopForm } from "./ShopForm";

interface MutateShopProps {
user:AppUser
shop?:ShopResponse
tenant?:TenantResponse
updating?:boolean
custom_icon?:{
    Icon:IconType;
    size:string;
  }
}

export function MutateShop({user,shop,tenant,custom_icon,updating}:MutateShopProps){
const [open, setOpen] = useState(false);
return (
 <div className='flex items-center justify-center'>
        <div
        className='flex items-center justify-center rounded-full aspect-square  
        p-2 
        relative bottom-[10%] right-[5%]'>
        <TheIcon 
            Icon={custom_icon?.Icon ?? FaPlus} 
            size={custom_icon?.size ?? '40'}
             iconAction={() => setOpen(true)} data_testid="open-shop-form" />
        </div>

        <ReactModalWrapper
            child={
                <div className='z-50'> 
                <ShopForm setOpen={setOpen} user={user} 
                updating={updating}
                shop={shop} tenant={tenant}/></div>
            }
            closeModal={() => setOpen(false)}
            delay={0}
            isOpen={open}

            styles={{
                overlay_top: '0%',
                overlay_right: '0%',
                overlay_left: '0%',
                overlay_bottom: '0%',
                content_bottom: '2%',
                content_right: '2%',
                content_left: '2%',
                content_top: '2%'

            }} />
 </div>
);
}



