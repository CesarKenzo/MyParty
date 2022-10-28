import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  pageSize = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
