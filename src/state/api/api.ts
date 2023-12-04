import { pb } from "../pb/config";

export async function fetchAll<T>(table:string){
try {
return await pb.collection(table).getFullList<T>({});
} catch (error) {
    console.log(`error fetching ${table} full list`,error)
    throw error
}
}
