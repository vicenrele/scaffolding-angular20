import { Injectable } from '@angular/core';
import { IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  convertObjectToIBookArray(data: any): IBook[] {
    if (data !== null && typeof data === 'object' && !Array.isArray(data)) {
      return Object.values(data) as IBook[];
    }
    else {
      return data as IBook[];
    }
  }  
}
