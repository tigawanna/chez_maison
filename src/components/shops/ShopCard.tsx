import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopResponse } from "../../state/api/shops";
import { AppUser } from "../../state/types/base";
import { MutateShop } from "./MutateShop";
import { UtilIcons } from "./UtilIcons";

interface ShopCardProps {
shop:ShopResponse
user:AppUser
}

export function ShopCard({shop,user}:ShopCardProps){
return (
    <div
        key={shop.id}
        style={{
            // filter: shop.is_vacant ? 'blur(1px)' : '',
            backgroundColor : shop.is_vacant?'#3A0806' : '',
        }}
        className='w-full p-5 md:w-[30%] h-full flex flex-wrap items-center justify-center border-shadow'>
    
        <Link to={`${shop.id}`}
            className='w-full h-full flex flex-col items-center justify-center hover:text-purple-500'>
            {/*top  */}
            <div className="w-full flex flex-wrap justify-between  items-center px-2 gap-2 ">
                <h2 className="font-bold ">{shop.shop_number}</h2>
                {shop.is_vacant && <h2 className="">VACANT</h2>}
                <h2 className="font-bold">{shop?.expand?.tenant?.name}</h2>
            </div>

            {/*bottom */}
   
        </Link>
        <div className="w-full flex  justify-between items-center px-2">

            <UtilIcons utils={shop.utils} />
            <h4 className="border border-purple-600 rounded-full p-1 aspect-square">{shop.order}</h4>
            <MutateShop user={user} shop={shop} updating
                custom_icon={{
                    Icon: FaRegEdit,
                    size: '20'
                }}
            />
        </div>
     
    </div>
);
}
