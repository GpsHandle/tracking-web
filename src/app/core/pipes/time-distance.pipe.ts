import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns'

@Pipe({
  name: 'timeDistance'
})
export class TimeDistancePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return formatDistanceToNow(value);
  }

}
