import { useQuery } from "@tanstack/react-query";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getShops} from "../../state/api/shops";

interface ShopListProps {

}

export function ShopList({}:ShopListProps){
    const query = useQuery({
        queryKey: ['shops'],
        queryFn: getShops
    })

    if (query.isLoading) {
        return <RqLoading />
    }
    if (query.isError) {
        return <RqError error={query.error} />
    }
    if (!query.data) {
        return <div className="w-full h-full flex items-center justify-center">No shops</div>
    }

    const shops = query.data;
return (
 <div className='p-5 w-full h-24 overflow-y-scroll scroll-bar flex flex-wrap items-center justify-center gap-2'>
 
  {shops.map((shop) => {
    return(
        <div className='py-1 px-2 border-slate-500 border rounded-lg
        flex items-center justify-center text-sm gap-2' key={shop.id}>
            <h4>{shop.shop_number}</h4>
            <h4 className="bg-purple-900 px-2">{shop.order}</h4>
        </div>
    )
  })}
 </div>
);
}
