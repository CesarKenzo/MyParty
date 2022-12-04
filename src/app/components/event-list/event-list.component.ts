import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';
import { Categorie } from '../model/categorie';
import { Production } from '../model/production';
import { subscribeOn } from 'rxjs';
import { CategorieService } from '../service/categorie.service';

const CATEGORIES: Categorie[] = [
  {name: 'Festas Universitárias', value: 'categoria-1'},
  {name: 'Música', value: 'categoria-2'},
  {name: 'Jogos Universitários', value: 'categoria-3'},
  {name: 'Música Internacional', value: 'categoria-4'},
  {name: 'Shows', value: 'categoria-5'},
];

const PRODUTOR:Production[] = [
  {name: 'Comissão de festas EACH-USP', value: '1'},
  {name: 'Associação Universitária', value: '2'},
  {name: 'Eventim', value: '3'},
];

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {

  categorieFilter: string = 'None';
  productionFilter: string = 'None';
  eventList: Event[] = [];
  categorieList: Categorie[] = [];
  produtorList: Production[] = PRODUTOR;
  panelOpenState = false;
  id: number = 0;
  listIds: number[] = [];
  tempEventList: Event[] = []

  constructor(
    private service: EventService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.listEvents()
    this.listCategories()
  }
  
  applyFilter() {
    if(this.categorieFilter != 'None' || this.categorieFilter != null || this.categorieFilter == undefined) {
      this.applyFilterCategory();
    }

    if(this.productionFilter != 'None' || this.productionFilter != null || this.productionFilter == undefined) {
      this.applyFilterProduction();
    } 
  }

  applyFilterCategory() {
    let tempEventList = []

    if(this.categorieFilter != 'None') {
      for(var x = 0; x < this.eventList.length; x++) {
        let e = this.eventList[x]
        for(var y = 0; y < e.categories.length; y++) {
          let c = e.categories[y]
          if(c == this.categorieFilter) {
            tempEventList.push(e)
          }
        }
      }
      this.eventList = tempEventList
    }  
  }

  applyFilterProduction(){
    let tempEventList = []

    if(this.productionFilter != 'None') {
      for(var x = 0; x < this.eventList.length; x++) {
        let e = this.eventList[x]
        if(e.production == this.productionFilter) {
          tempEventList.push(e)
        }
      }
      this.eventList = tempEventList
    } 
  }

  listEvents() {
    this.service.listar().subscribe((eventList) => {
      this.eventList = eventList
    }) 
  }

  listCategories() {
    this.categorieService.listar().subscribe((categorieList) => {
      this.categorieList = categorieList
    }) 
  }
}
