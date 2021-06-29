import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject<Product>()

  constructor() { }

  sendMsg(product: Product) {
    this.subject.next(product); //Triggers an event
  }

  getMsg() {
    return this.subject;
  }

}
