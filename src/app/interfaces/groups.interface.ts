import { GroupsBaseInterface } from "./app.interface";
export interface GroupsInterface extends GroupsBaseInterface{
  can_edit: boolean;
  count_users: number;
  group_name: string  ;
  group_role: string;
  is_default: boolean;
  owner_id: string,
  person_id: string,
  success: boolean
}

