import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone:true
})
export class DurationFormatPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let durationString = '';

    if (hours > 0) {
      if(hours==1){
      durationString += hours + ' hour ';
      }
    else{
      durationString += hours + ' hours ';

    }
    }
   
    if (remainingMinutes > 0) {
      durationString += remainingMinutes + ' minutes';
    }

    return durationString;
  }
}