import { pb } from "../pb/config";
import { BillResponse } from "./bills";
import { TenantResponse } from "./tenant";


export interface ShopExpand{
    tenant:TenantResponse
    "bills(shop)":Omit<BillResponse,"expand">[]
}

export interface ShopResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    tenant: string
    shop_number: string
    supa_tenant: string
    utils: "elec"|"water"|"both"
    order: number
    is_vacant:boolean
    supa_id: string
    expand:ShopExpand
}



export type ShopMutationFields = Omit<ShopResponse,
"collectionId"|"collectionName"|"created"|"update"|"id"|"expand"|"supa_id"|"supa_tenant"|"updated">


export async function addShop(shop:ShopMutationFields) {
    try {
        const record = await pb.collection('shops').create<ShopResponse>(shop,{
            expand: 'tenant',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateShop(shop_id:string,shop: ShopMutationFields) {
    try {
        const record = await pb.collection('shops').update<ShopResponse>(shop_id,shop,{
            expand: 'tenant',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function getShops() {
    try {
        const records = await pb.collection('shops').getFullList<ShopResponse>({
            sort: 'order',
            expand: 'tenant',
        });
        return records
    } catch (error) {
        console.log("error loading shops",error)
        throw error
    }
}

export async function getShop(id:string) {
    try {
        const record = await pb.collection('shops').getFirstListItem<ShopResponse>(`id="${id}"`, {
            expand: 'tenant,bills(shop)',
        });
        return record
    } catch (error) {
        console.log("error loading one shop", error)
        throw error 
    }
}
