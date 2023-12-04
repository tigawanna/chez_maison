import { PocketBaseClient } from "@/lib/pb/client";
import { UtilityTenantsResponse } from "@/lib/pb/db-types";

export async function searchTenant(pb:PocketBaseClient,keyword: string) {
    try {
        // you can also fetch all records at once via getFullList
        const records = await pb
            .collection("utility_tenants").getList(1,10 /* batch size */, {
                sort: "-created",
                filter: `username~"${keyword}"`,
            });

        return records?.items?.map((record: UtilityTenantsResponse) => {
            // @ts-expect-error
            record["value"] = record.id;
            // @ts-expect-error
            record["label"] = record.name;

            return record;
        });
    } catch (error: any) {
        console.log("error searching tenant", error);
        throw error;
    }
}
