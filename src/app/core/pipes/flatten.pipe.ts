import { Pipe, PipeTransform } from '@angular/core';
import {forEach} from 'lodash-es';

@Pipe({
  name: 'flatten'
})
export class FlattenPipe implements PipeTransform {

  transform(values: any[], args: string): string {
      let ret = '';
      forEach(values, (value => {
          ret += value[args];
      }));
    return ret;
  }

}
