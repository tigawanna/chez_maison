/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import PocketBase from 'pocketbase';
import { AppUser } from '../types/base';

export const pb_url = import.meta.env.VITE_PB_URL
export const main_url = import.meta.env.VITE_SITE_URL

export const pb = new PocketBase(pb_url);

export async function getUser() {
  return pb.authStore.model as unknown as AppUser
}

export const loginUser = async ({email,password}:{email:string; password:string}) => {
try {
  return await pb.collection('staff').authWithPassword(email,password);
} catch (error) {
  throw error;
}

}


export const makeImageUrl = (
  coll_name: string,
  record_id: string,
  media_name: string
) => {
  if (media_name) {
    return `${pb_url}/api/files/${coll_name}/${record_id}/${media_name}`;
  }
  return 'https://i.pravatar.cc/300';
};


