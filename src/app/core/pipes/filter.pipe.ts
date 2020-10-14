import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], criteria: any): any {
        if (items) {
            return items.filter(item =>{
                for (let key in item ) {
                    if((""+item[key]).includes(criteria)){
                        return true;
                    }
                }
                return false;
            });
        }
    }

}
