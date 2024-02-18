import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapperDateService {

  constructor() { }

  dateToString(date: Date) : string {
    let iso = date.toISOString();
    console.log(date);
    //exemple ISO: 2022-12-14T10:45:11.874Z
    //             012345678911234567892123
    let yy: string = iso.substring(2,4);
    let MM: string = iso.substring(5,7);
    let dd: string = iso.substring(8,10);
    let hh: string = iso.substring(11,13);
    let mm: string = iso.substring(14,16);
    let ss: string = iso.substring(17,19);

    let newDate = `${dd}-${MM}-${yy} ${hh}:${mm}:${ss}`;
    return newDate
  }
}
