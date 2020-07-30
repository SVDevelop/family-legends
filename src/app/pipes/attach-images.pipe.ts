import { Pipe, PipeTransform } from '@angular/core';
import {AttachmentInterface} from "../interfaces/app.interface";

@Pipe({
  name: 'attachImages'
})
export class AttachImagesPipe implements PipeTransform {
  transform (input: AttachmentInterface[]): AttachmentInterface[] {
    if(input){
      let cResult = input.filter((item:AttachmentInterface) => item.content_type === 'image/png' || item.content_type === 'image/jpeg');
      if(cResult.length) {
        return cResult;
      }
    }
    return null;
  }

}
