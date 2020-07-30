import { Pipe, PipeTransform } from '@angular/core';
import {AttachmentInterface} from "../interfaces/app.interface";

@Pipe({
  name: 'attachImage'
})
export class AttachImagePipe implements PipeTransform {

  transform (input: AttachmentInterface): AttachmentInterface {
    let cResult = null ;
    if(input){
      if(input.content_type === 'image/png' || input.content_type === 'image/jpeg'){
        return input
      }
    }
    return null;
  }

}
