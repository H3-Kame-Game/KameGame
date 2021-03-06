import { Component, OnInit } from '@angular/core';
import { YugiohService } from '../Services/yugioh.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private cards: YugiohService) {}

  public cardData: any;
  public cardList: any = [];
  public cart: any = [];
  holder: any;

  ngOnInit(): void {
    this.products();

    this.holder = JSON.parse(sessionStorage['cart']);
    console.log(this.holder[0]);

    for (let index = 0; index < this.holder.length; index++) {
      const element = this.holder[index];
      this.cart.push({
        id: Number(element.id),
        name: String(element.name),
        smallImg: String(element.smallImg),
        // cardPrice: String(element.card_prices[0].tcgplayer_price),
        cardPrice: String(element.cardPrice),
        amount: Number(element.amount)
      });
    }
    console.log(this.cart);
  }

  AddToCart(item: any) {
    let recurring = this.cart.find((data: any)  => data.id == item.id);

    if (recurring != null) {
      this.cart[this.cart.indexOf(recurring)].amount += 1;
    }
    else {
      this.cart.push({
        id: item.id,
        name: item.name,
        smallImg: item.imgUrlSmall,
        cardPrice: item.cardPrice,
        amount: 1
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(sessionStorage.getItem('cart'));
  }


  products() {
    this.cards.getStaple().subscribe((res) => {
      this.cardData = res;
      //console.log(this.cardData.data);
      for (let index = 0; index < this.cardData.data.length; index++) {
        const element = this.cardData.data[index];
        this.cardList.push({
          id: element.id,
          name: element.name,
          imgUrl: element.card_images[0].image_url,
          imgUrlSmall: element.card_images[0].image_url_small,
          cardPrice: element.card_prices[0].tcgplayer_price,
          desc: element.desc,
        });
      }
    });
  }
}
