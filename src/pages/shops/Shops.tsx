import { useQuery } from "@tanstack/react-query";
import { MutateShop } from "../../components/shops/MutateShop";
import { ShopCard } from "../../components/shops/ShopCard";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getShops } from "../../state/api/shops";
import { AppUser } from "../../state/types/base";

interface ShopsProps {
user:AppUser
}

export default function Shops({user}:ShopsProps){
  const query = useQuery({
    queryKey: ['shops'],
    queryFn:getShops
  })

 if(query.isLoading){
   return <RqLoading/>
 }
 if(query.isError){
   return <RqError error={query.error}/>
 }
 if(!query.data){
  return <div className="w-full h-full flex items-center justify-center">No shops</div>
 }

  const shops = query.data;
// console.log("shops  === ",shops)
  return (
    <div className='w-full h-full min-h-screen  flex flex-col items-start'>
      <div className='w-full h-[80%] p-2 flex flex-wrap justify-center items-center gap-5 '>
        {shops.map((shop) => {
            return <ShopCard shop={shop} key={shop.id} user={user}/>
          })
        }
        <MutateShop user={user} />
      </div>
   
    </div>
  );
};


