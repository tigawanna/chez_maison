import { Link } from "react-router-dom";
import { TenantResponse } from "../../state/api/tenant";
import { UtilIcons } from "../shops/UtilIcons";

interface TenantShopsProps {
tenant:TenantResponse
}

export function TenantShops({tenant}:TenantShopsProps){
if(!tenant.expand["shops(tenant)"]) {
    return null
} 
const tenant_shops =  tenant.expand["shops(tenant)"]
return (
 <div className='w-full h-full flex items-center justify-start'>
 {
tenant_shops.map((tenant_shop) => {
return(
    <Link to={`../shops/${tenant_shop.id}`} className="w-fit px-2 py-1 
    flex justify-center items-center rounded 
    outline hover:outline-purple-600 hover:outline-2 
    gap-2">
    <h2 className="">{tenant_shop.shop_number}</h2>
        <UtilIcons utils={tenant_shop.utils} />
        <h4 className="text-xs border rounded-full border-purple-500 p-1">{tenant_shop.order}</h4>
    </Link>
)
})
 }
 </div>
);
}
