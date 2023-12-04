import PocketBase from 'pocketbase';
 import {pb as local_pb} from '../pb/config'
export function hello() {
    return 'hello'
}

// import shops_json from '../data/shops.json'
// // import pb_tenants from '../data/pb-tenants.json'
// // import pb_shops from '../data/pb_shops.json'
// import tenants_json from '../data/tenants.json'
// import full_supa_bills_json from '../data/full_supa_bills.json'
// import { addShop, ShopResponse } from './shops';
// import { addTenant } from './tenant';
// import { addBill, BillMutationFields } from './bills'
// import { pb } from '../pb/config'

// import pb_tenants from '../pb_data/pb_tenants.json'
// import pb_shops from '../pb_data/pb_shop.json'
// import pb_bills from '../pb_data/pb_bills.json'

// interface OldShop {
//     id: string;
//     created_at: string;
//     tenant: string;
//     shop_number: string;
//     order: number;
//     has_water: boolean;
//     has_elec: boolean;
//     is_vacant: boolean;
// }

// interface OldBill {
//     id: string;
//     created_at: string;
//     shop: {
//         id: string;
//         shop_number: string;
//         tenant: {
//             id: string;
//             tenant_name: string;
//         };
//     };
//     elec_readings: number;
//     water_readings: number;
//     month: number;
//     year: number;
// }

// function matchTeanatToShop(a_shop: OldShop) {
//     const pb_tenant = pb_tenants.find(tenant => {
//         return (tenant.supa_id === a_shop.tenant)
//     })


//     const genUtils = () => {
//         if (a_shop.has_water && a_shop.has_elec) {
//             return "both"
//         }
//         if (a_shop.has_elec) {
//             return "elec"
//         }
//         return "water"
//     }
//     // console.log("pb_tenant",pb_tenant)
//     return {
//         tenant: pb_tenant?.id,
//         shop_number: a_shop.shop_number,
//         utils: genUtils(),
//         order: a_shop.order,
//         supa_id: a_shop.id
//     }
// }

// function matchPbShopToShop(pb_shop:ShopResponse) {
//     return  shops_json.find(shop => (shop.shop_number === pb_shop.shop_number))
// }

// export function addSupaIdtopbShops(){
// return pb_shops.map(pb_shop => {
//     // @ts-expect-error
//     pb_shop['supa_shop_id']=matchPbShopToShop(pb_shop)?.id
//     return pb_shop
// })
// }
// // ^(G-[0-9][1-9]|G-[1-9][0-9]|M[1-9]-[0-9][1-9]|M[1-9]-[1-9][0-9]|BASEMENT|NIBS)$



// export async function migrateShops() {
//     for await (const a_shop of shops_json) {
//         const shop = matchTeanatToShop(a_shop)
//         // @ts-ignore
//     return await addShop(shop)
//     }
// }


// export async function migrateTenantdtae() {
//     for await (const a_tenant of tenants_json) {
//         const tenant = {
//             name: a_tenant.tenant_name,
//             supa_id: a_tenant.id,
//         }
//         return await addTenant(tenant)
//     }
// }



// function matchshopToBill(bill:OldBill){
//     return pb_shops.find(shop => (shop.shop_number === bill.shop.shop_number))
// }




// export async function migrateBills() {

    
//     for await (const a_bill of full_supa_bills_json) {
//         console.log("a_bill",a_bill)
//         const shop = matchshopToBill(a_bill)?.id as string
//         const new_bill:BillMutationFields = {
//             elec_readings:a_bill.elec_readings,
//             water_readings:a_bill.water_readings,
//             month:a_bill.month,
//             year:a_bill.year,
//             shop
//         }
//         if(!shop){
//             console.log("shop not found",a_bill)
//             return
//         }
       
//         return await addBill(new_bill)


//     }
// }



// export async function migrateAllBills() {
//     pb.autoCancellation(false);
//     const promises = full_supa_bills_json.map(async (a_bill) => {
//         console.log("a_bill", a_bill)
//         const shop = matchshopToBill(a_bill)?.id as string
//         const new_bill: BillMutationFields = {
//             elec_readings: a_bill.elec_readings,
//             water_readings: a_bill.water_readings,
//             month: a_bill.month,
//             year: a_bill.year,
//             shop
//         }
//         if (!shop) {
//             console.log("shop not found", a_bill)
//             return
//         }

//         return await addBill(new_bill)
//     })
//     return Promise.all(promises)
// }



// export async function migrateTenantsToRemote() {
//     pb.autoCancellation(false);
//     const promises = [];
//     for await (const a_tenant of pb_tenants) {
//         //@ts-ignore
//         promises.push(addTenant(a_tenant));
//     }
//     return await Promise.all(promises);
// }

// export async function migrateShopsToRemote(){
//     pb.autoCancellation(false);
//     const promises = [];
//     for await (const a_shop of pb_shops) {
//         // @ts-expect-error
//         promises.push(addShop(a_shop));
//         // return await addShop(a_shop)
//     }
//     return await Promise.all(promises);
// }

// export async function migrateBillsToRemote(){
//     pb.autoCancellation(false);
//     const promises = [];
//     for await (const a_bill of pb_bills) {
//         // return await addBill(a_bill)
//         promises.push(addBill(a_bill))
//     }
//     return await Promise.all(promises);
// }


// export async function getFullList(table:string) {
//     try {
//         const records = await pb.collection(table).getFullList({
      
//         });
//         return records
//     } catch (error) {
//         console.log("error getting bills  === ", error)
//         throw error
//     }
// }


export const pb_url = import.meta.env.VITE_PB_URL
export const pb_prod_url = import.meta.env.VITE_PROD_PB_URL
export const main_url = import.meta.env.VITE_SITE_URL

export const pb = new PocketBase(pb_prod_url);

export async function getProdBills(){
    try {
        const records = await pb.collection("bills").getFullList({
            
        })
        return records
    } catch (error) {
        throw error
    }
}
export async function getAllRecords(table:string){
    try {
        const records = await pb.collection(table).getFullList({

        })
        return records
    } catch (error) {
        throw error
    }
}



export async function getAllLocalRecords(table: string) {
    // local_pb= new Pocketbase(local_pb_url);
    try {
        const records = await local_pb.collection(table).getFullList({

        })
        return records
    } catch (error) {
        throw error
    }
}




export async function saveRecord(record: any, table:string){
try{
// pb= new Pocketbase(remote_pb_url);
return await pb.collection(table).create(record)
}catch(error){
    throw error
}
}


export async function migrateRecords(table:string){
    try {
        // pb= new Pocketbase(remote_pb_url);
    await pb.collection('user').authWithPassword("person@gmail.com", "password");   
    const records = await getAllLocalRecords(table)
    pb.autoCancellation(false);
    const promises = records.map((record) => saveRecord(record, table));
    return await Promise.all(promises);

    }catch(error){
        throw error
    }
}
