import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service'
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem!: Product;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  handelAddToCart() {
    this.cartService.addProductToCart(this.productItem).subscribe(() => {
      this.msg.sendMsg(this.productItem)
    })
  }
}
