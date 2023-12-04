import PocketBase, { OAuth2AuthConfig} from "pocketbase";
import { GithubOauthResponse } from "./types";
import { TypedPocketBase } from "typed-pocketbase";
import { Schema,UtilityBillsUpdate,UtilityShopsCollection,UtilityStaffCreate,UtilityStaffResponse } from "./db-types";
import { tryCatchWrapper } from "@/utils/async";
import { RequestContext } from "rakkasjs";
import { TypedRecordListQueryParams } from "./typed-pocketbase";

export type PocketBaseClient = TypedPocketBase<Schema>;

const pb_url = import.meta.env.RAKKAS_PB_URL;
export const pb = new PocketBase(pb_url) as TypedPocketBase<Schema>;


export async function createUser(data: UtilityStaffCreate) {
  const res = await tryCatchWrapper(
    pb.collection("utility_staff").create(data),
  );
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  return res;
}

export async function verifyUserEmail(email: string) {
  return await tryCatchWrapper(
    pb.collection("utility_staff").requestVerification(email),
  );
}

export async function emailPasswordLogin(identity: string, password: string) {
  const user = await tryCatchWrapper(
    pb.collection("utility_staff").authWithPassword(identity, password),
  );
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  return user;
}

// export async function oauthLogin(options:OAuth2AuthConfig) {
//     return await tryCatchWrapper(pb.collection('utility_staff').authWithOAuth2(options))
// }

export async function listOAuthMethods() {
  return await tryCatchWrapper(
    pb.collection("utility_staff").listAuthMethods(),
  );
}

export async function triggerOuathLogin(options: OAuth2AuthConfig) {
  return await tryCatchWrapper<GithubOauthResponse>(
    pb.collection("utility_staff").authWithOAuth2(options) as any,
  );
}

export async function oneClickOauthLogin(provider: "github" | "google") {
  try {
    // const authData = await pb.collection('utility_staff').authWithOAuth2({ provider});
    const authData = await pb
      .collection("utility_staff")
      .authWithOAuth2({ provider});
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    return authData.record
  } catch (error) {
    throw error;
  }
}

type CollectionName = keyof Schema;

export function getFileURL({
  collection_id_or_name,
  file_name,
  record_id,
}: {
  collection_id_or_name?: CollectionName;
  record_id?: string;
  file_name?: string;
}) {
  if (!collection_id_or_name || !file_name || !record_id) {
    return "";
  }
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME?thumb=100x300
  return `${pb_url}/api/files/${collection_id_or_name}/${record_id}/${file_name}`;
}

export async function serverSidePocketBaseInstance(
  ctx: RequestContext<unknown>,
) {
  try {
    const pb_cookie = ctx.request.headers.get("cookie") ?? "";
    const pb = new PocketBase(
      import.meta.env.RAKKAS_PB_URL,
    ) as PocketBaseClient;
    pb.authStore.loadFromCookie(pb_cookie);
    return pb;
  } catch (error) {
    throw error;
  }
}
export async function serverSideAdminPocketBaseInstance(
  ctx: RequestContext<unknown>,
) {
  try {
    const pb = new PocketBase(
      import.meta.env.RAKKAS_PB_URL,
    ) as PocketBaseClient;
    await pb.admins.authWithPassword(
      import.meta.env.RAKKAS_ADMIN_USERNAME,
      import.meta.env.RAKKAS_ADMIN_PASSWORD,
    );
    return pb;
  } catch (error) {
    throw error;
  }
}
