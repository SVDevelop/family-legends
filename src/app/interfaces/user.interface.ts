import {AttachmentInterface, DateInterface, GroupsInvatedInterface} from "./app.interface";
export interface AppUserInterface {
  token: string;
  user_id: string;
  phone: string;
}
export interface AppUserAnswerInterface extends AppUserInterface{
  default_group_id?: string;
  default_person_id?: string;
  groups_invited?: GroupsInvatedInterface[];
  is_new?: boolean;
}
export interface UserInfoInterface extends AppUserInterface{
  default_group_id: string;
  default_person_id: string;
  groups_invited: GroupsInvatedInterface[];
  is_new: boolean;
}
//
//
// default_group_id: "39cdc251-5925-4bcc-9506-c84a4f95feaf"
// default_person_id: "37f52513-9c57-4c2b-b250-475aa9fa8988"
// groups_invited: []
// is_new: false
// phone: "+79529662096"
// token: "NWIxYjhmMGItZmI1Yi00MWQ5LTk2MzYtNjZjYzk1MDgxZDBkLDViMWI4ZjBiLWZiNWItNDFkOS05NjM2LTY2Y2M5NTA4MWQwZCw1YjFiOGYwYi1mYjViLTQxZDktOTYzNi02NmNjOTUwODFkMGQsMjAyMS0wNi0yNFQyMDo0NTozNFosYjg4NGM3ODY5YzgzMmI2NzhhMzFkMGUwNzBmMjMxN2E="
// user_id: "75e61194-9dec-4053-b4d0-e9ede00e14dd"
