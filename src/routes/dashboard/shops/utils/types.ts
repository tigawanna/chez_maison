import { UtilityShopsResponse, UtilityTenantsResponse } from "@/lib/pb/db-types";
import { TypedRecord } from "typed-pocketbase";

export type ShopRecord = TypedRecord<UtilityShopsResponse, { "tenant": UtilityTenantsResponse }>;
