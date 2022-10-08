import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements OnInit {
  value = 0;
  typesOfTicket: string[] = ['Ingresso 1', 'Ingresso 2'];

  constructor() {}

  ngOnInit(): void {
  }

}
