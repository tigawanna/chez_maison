import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ShopBillsTable } from "../../components/shops/ShopBillsTable";
import { UtilIcons } from "../../components/shops/UtilIcons";
import { DateOutput } from "../../shared/extra/DateOutput";
import { useDocumentTitle } from "../../shared/hooks/useDocumentTitle";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getShop } from "../../state/api/shops";
import { AppUser } from "../../state/types/base";

interface OneShopProps {
user:AppUser
}
type OneShopParams = {
    id:string
}
export default function OneShop({user}:OneShopProps){
const param  = useParams<OneShopParams>()
const queryKey = ['shops', param.id]
const query = useQuery({
    queryKey,
    queryFn:()=>getShop(param?.id as string)
})
    useDocumentTitle(query.data?.shop_number as string)

    if (query.isLoading) {
        return <RqLoading />
    }
    if (query.isError) {
        return <RqError error={query.error} />
    }
    if (!query.data) {
        return <div className="w-full h-full flex items-center justify-center">No shop of ID {param.id}</div>
    }

const shop = query.data;
const shop_bills = shop.expand["bills(shop)"].sort((a, b) => ((b.year - a.year)||(b.month-a.month))); 

 return (
 <div className='w-full h-full flex flex-col  items-center justify-center gap-2'>
        <div
            key={shop.id}
            className='w-[90%] lg:w-[70%] p-5  
            h-full rounded-lg sticky top-[5%] bg-slate-900
            flex flex-wrap items-center justify-center border gap-5'>

                {/*top  */}
                <div className="w-full flex flex-wrap justify-between items-center px-2">
                    <h1 className="font-bold">{shop.shop_number}</h1>
                    <h1 className="">{shop?.expand?.tenant?.name}</h1>
                </div>

                {/*bottom */}
                <div className="w-full flex  justify-between items-center px-2">
                    <DateOutput the_date={shop.created} />
                    <UtilIcons utils={shop.utils} />
                </div>
     
        </div>
        <div className='flex items-center justify-center'>
             <ShopBillsTable bills={shop_bills} printing={false} updating={true} shop={shop}/>
        </div>
 </div>
);
}
