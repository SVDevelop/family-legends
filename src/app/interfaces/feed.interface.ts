import {AttachmentInterface, DateInterface } from './app.interface';
//BASE
export interface FeedBasePersonResponseInterface {
  "attachment": AttachmentInterface,
  "first_name": string,
  "surname": string
}
export interface FeedBaseCounterResponseInterface {
  "audio": number,
  "event": number,
  "image": number,
  "note": number,
  "person": number,
  "place": number,
  "video": number
}
export interface FeedBasisResponseInterface {
  "can_delete": boolean,
  "can_edit": boolean,
  "can_extend": boolean,
  "created_at": string,
  "created_by": string,
  "id": string,
  "revision_id": string,
  "text"?: string,
  "updated_at"?: string,
  "updated_by"?: string
  person_creater?: FeedBasePersonResponseInterface|null
}
export interface FeedBaseResponseInterface extends FeedBasisResponseInterface{
  "attachments"?: AttachmentInterface[];
  "attachment"?: AttachmentInterface;
}
export interface FeedBaseResponseInterfaceOneAttach extends FeedBasisResponseInterface{
  "attachment"?: AttachmentInterface;
}
export interface CommentResponseInterface extends FeedBaseResponseInterface {
  "is_related": boolean,
  "parent_id": string,
  "person_creater": FeedBasePersonResponseInterface|null,
  "person_updater": FeedBasePersonResponseInterface|null
}
export interface BaseResponseInterface {
  "count": number,
}

//EVENTS
export interface EventResponseInterface extends BaseFieldsAnswerFeedInterface {
  "counters": FeedBaseCounterResponseInterface,
  "name": string,
  "date_event": DateInterface,
  "address"?: string
}
export interface EVENTSResponseInterface extends BaseResponseInterface{
  "results": EventResponseInterface[]
}

//NOTES
export interface NoteResponseInterface extends FeedBasisResponseInterface{
  "is_related"?: boolean,
  "parent_id"?: string,
  "counters"?: FeedBaseCounterResponseInterface,
  "events"?: EventResponseInterface[],
  "persons"?: FeedPersonResponseInterface[],
  "places"?: FeedPlaceResponseInterface[]
}

//PLACES
export interface FeedPlaceResponseInterface extends BaseFieldsAnswerFeedInterface{
  "name": string,
  "counters": FeedBaseCounterResponseInterface,
  "lat": number,
  "long": number,
  "address"?: string,
}
export interface PLACEResponseInterface extends BaseResponseInterface{
  "results": FeedPlaceResponseInterface[]
}

//PLACES_EVENT
export interface FeedPlaceEventResponseInterface extends BaseFieldsAnswerFeedInterface{
  "counters"?: FeedBaseCounterResponseInterface,
  "name": string,
  "date_event": DateInterface,
  "lat"?: number,
  "long"?: number,
  "address"?: string
}

//FEED
// export interface BaseFieldsAnswerFeedInterface extends FeedBaseResponseInterfaceOneAttach{
export interface BaseFieldsAnswerFeedInterface extends FeedBaseResponseInterface{
  "is_related": boolean,
  "person_creater": FeedBasePersonResponseInterface|null,
  "person_updater": FeedBasePersonResponseInterface|null
}

export interface FeedResponseResultInterface extends FeedBaseResponseInterface{
  "type": string,
  "person_creater": FeedBasePersonResponseInterface|null,
  "person_updater": FeedBasePersonResponseInterface | null,
  "comments": CommentResponseInterface[] | null,
  "event"?: EventResponseInterface,
  "note"?: NoteResponseInterface,
  "person": FeedPersonResponseInterface,
  "place"?: FeedPlaceResponseInterface
}
export interface FeedResponseInterface extends BaseResponseInterface{
  "results": FeedResponseResultInterface[]
}

//PERSONS
export interface FeedPersonResponseInterface extends BaseFieldsAnswerFeedInterface{
  "counters"?: FeedBaseCounterResponseInterface,
  "birth_date": DateInterface,
  "death_date"?: DateInterface,
  "first_name": string,
  "phone": string,
  "real_user": boolean,
  "sex": number,
  "surname": string,
  file_id?:string
}
export interface PERSONResponseInterface extends BaseResponseInterface{
  "results": FeedPersonResponseInterface[]
}
