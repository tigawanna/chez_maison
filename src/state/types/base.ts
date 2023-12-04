import { Admin } from "pocketbase";

export interface STAFF {
  id: string
  collectionId: string
  collectionName: string
  username: string
  verified: boolean
  emailVisibility: boolean
  email: string
  created: string
  updated: string
  name: string
  type: "manager"|"caretaker"|"cashier"
  avatar: string
}
export type AppUser = STAFF | undefined;

