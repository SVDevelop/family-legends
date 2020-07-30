import {
  CommentResponseInterface, EventResponseInterface,
  FeedBasePersonResponseInterface,
  FeedBasisResponseInterface, FeedPersonResponseInterface, FeedPlaceResponseInterface,
  NoteResponseInterface, FeedBaseCounterResponseInterface
} from './feed.interface';
import {Data} from "@angular/router";
export interface AppRouterData {
  parentType: string;
}

export interface AppUrls {
  urlSendCode: string
  urlLogin: string;
  urlRegistration: string;
}

export interface AppIdReturnInterface {
  id: string
}

export interface AttachmentInterface {
  content_type: string;
  file_id: string;
  url: string;
}
export interface DateInterface {
  accuracy: number;
  date: string;
}

export interface AppStoreInterface extends AppUrls{
  beforeURL?: string;
  afterURL?: string;
  nowPage: string;
  isLoader: boolean;

  user_id: string;
  token: string;
  phone: string;
  xId?:string;
  profileInfo?: InfoInterface;
  profilePerson?: ProfileInfoInterface;

  time?: number;
  isSuccess: boolean;
  pageNow: string;
}

export interface InfoInterface{
  default_group_id: string;
  group_id: string;
  group_role: string;
  groups: GroupInfoInterface[],
  profile: ProfileInfoInterface,
}
export interface ProfileInfoInterface {
  first_name: string;
  id: string;
  phone: string;
  real_user: boolean;
  revision_id: string;
  attachment?: AttachmentInterface;
  birth_date?: DateInterface;
  death_date?: DateInterface;
  sex?: number;
  surname?: string;
  text?: string;

  can_delete?:boolean;
  can_edit?:boolean;
  can_extend?:boolean;
  counters?:FeedBaseCounterResponseInterface;
  created_at?:string;
  created_by?:string;
  is_related?:boolean;
  person_creater?:FeedBasePersonResponseInterface;
  person_updater?:FeedBasePersonResponseInterface;
  updated_at?:string;
  updated_by?:string;
}

export interface NewPersonInterface {
  "attachment"?: string;
  "birth_date": DateInterface;
  "death_date"?: DateInterface;
  "first_name": string;
  "id"?: string;
  "phone"?: string;
  "real_user": boolean;
  "sex": number;
  "surname"?: string;
  "text"?: string;
}
export interface EditFormPersonInterface {
  "attachment"?: string;
  "birth_date"?: DateInterface;
  "death_date"?: DateInterface;
  "first_name"?: string;
  "id"?: string;
  "phone"?: string;
  "real_user"?: boolean;
  "sex"?: number;
  "surname"?: string;
  "text"?: string;
}
export interface PersonBaseInterface {
  attachment?: AttachmentInterface;
  birth_date: DateInterface;
  death_date?: DateInterface;
  first_name: string;
  id: string;
  phone: string;
  real_user: boolean;
  revision_id: string;
  sex: number;
  surname?: string;
  text?: string;
}
export interface PersonEditStoreInterface extends PersonBaseInterface{
  status: number|1, //0 - start, 1-edit
  isNeedUpdateDetail: boolean // update PERSON_DETAIL
}

export interface NewPlaceInterface {
  "address"?: string;
  "attachment"?: string;
  "lat"?: number,
  "long"?: number,
  "name": string;
  "text"?: string;
}
export interface PlaceBaseInterface {
  "address"?: string;
  "attachment"?: AttachmentInterface;
  "lat"?: number,
  "long"?: number,
  "name": string;
  "text"?: string;
  "id"?:string;
}
export interface PlaceEditInterface extends NewPlaceInterface{
  "id"?:string;
}
export interface PlaceEditStoreInterface extends PlaceBaseInterface{
  status: number|1, //0 - start, 1-edit
  isNeedUpdateDetail: boolean // update PERSON_DETAIL
}
export interface NewEventInterface {
  "attachment"?: string;
  "date_event"?: DateInterface,
  "name": string;
  "text"?: string;
}
export interface EventBaseInterface {
  "attachment"?: AttachmentInterface;
  "date_event"?: DateInterface,
  "name": string;
  "text"?: string;
  "id"?:string;
}
export interface EventEditInterface extends NewEventInterface{
  "id"?:string;
}
export interface EventEditStoreInterface extends EventBaseInterface{
  status: number|1, //0 - start, 1-edit
  isNeedUpdateDetail: boolean // update PERSON_DETAIL
}
export interface NewNoteInterface {
  attachments?:string[];
  "event"?: string[];
  "parent_id"?: string[]; // только при создании комментария
  "person"?: string[];
  "place"?: string[];
  "text": string;
}
export interface NoteBaseInterface{
  attachments?: AttachmentInterface[];
  can_delete?: boolean;
  can_edit?: boolean;
  can_extend?: boolean;
  comments?: CommentResponseInterface[] | null;
  created_at?: string;
  created_by?: string;
  id: string;
  parent_id?: string;
  person_creater?: FeedBasePersonResponseInterface|null,
  person_updater?: FeedBasePersonResponseInterface|null,
  revision_id?: string
  text?: string

  "events"?: EventResponseInterface[],
  "persons"?: FeedPersonResponseInterface[],
  "places"?: FeedPlaceResponseInterface[]
}
export interface NoteEditInterface extends NewNoteInterface{
  "id"?:string;
}
export interface NoteEditStoreInterface extends NoteBaseInterface{
  status: number|1, //0 - start, 1-edit
  isNeedUpdateDetail: boolean // update PERSON_DETAIL
}

export interface GroupInfoInterface {
  attachment: AttachmentInterface;
  can_edit: boolean;
  count_users: number;
  group_name: string;
  group_role: string;
  id: string;
  is_default:boolean;
  owner_id: string;
  person_id: string;
}

export interface GroupsBaseInterface {
  attachment: AttachmentInterface;
  count_users: number;
  group_name: string;
  id: string;
  owner_id: string;
  person_id: string;
}
export interface GroupsInvatedInterface extends GroupsBaseInterface{
  person_owner: PersonBaseInterface;
  sender_name: string;
}

export interface EditPersonInterface{
  status: string;
  data: PersonBaseInterface;
}
export interface ProfileEditInterface{
  attachment?: string | null;
  birth_date: DateInterface;
  death_date?: DateInterface;
  first_name:string;
  surname:string;
  id:string;
  phone?:string;
  real_user?:boolean;
  revision_id?:string;
  sex:number;
  text?:string;
}
// {
//   "attachment": "ec581a85-4aed-422e-9038-9b7c13c07bb1",
//   "birth_date": {
//   "accuracy": 1,
//     "date": "2006-01-02T15:04:05.999999999Z"
// },
//   "death_date": {
//   "accuracy": 1,
//     "date": "2006-01-02T15:04:05.999999999Z"
// },
//   "first_name": "Петр",
//   "id": "ec581a85-4aed-422e-9038-9b7c13c07bb1",
//   "phone": "+798001234567",
//   "real_user": true,
//   "revision_id": "ec581a85-4aed-422e-9038-9b7c13c07bb1",
//   "sex": 0,
//   "surname": "Кирсанов",
//   "text": "краткое описание чего-нибудь"
// }

export interface aNewFilesInterface{
  id: string;
  file?: File;
  previewUrl: string;
}
