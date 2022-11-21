import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';
import { Categorie } from '../model/categorie';
import { Production } from '../model/production';
import { subscribeOn } from 'rxjs';

const EVENTS: Event[] = [
  {name: 'Evento 1', production: 'Produtor 1', rating: 5, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa1.jpg', description: 'Descrição do Evento', categories: ['Categoria 1', 'Categoria 2', 'Categoria 3'], features: ''},
  {name: 'Evento 2', production: 'Produtor 2', rating: 4, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa2.jpg', description: 'Descrição do Evento', categories: ['Categoria 1', 'Categoria 3', 'Categoria 4'], features: ''},
  {name: 'Evento 3', production: 'Produtor 3', rating: 4, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa3.jpg', description: 'Descrição do Evento', categories: ['Categoria 2', 'Categoria 3', 'Categoria 4'], features: ''},
  {name: 'Evento 4', production: 'Produtor 4', rating: 5, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa4.jpg', description: 'Descrição do Evento', categories: ['Categoria 3', 'Categoria 5'],  features: ''},
  {name: 'Evento 5', production: 'Produtor 5', rating: 5, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa5.jpg', description: 'Descrição do Evento', categories: ['Categoria 2', 'Categoria 5', 'Categoria 6'],  features: ''},
  {name: 'Evento 6', production: 'Produtor 6', rating: 3, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa6.jpg', description: 'Descrição do Evento', categories: ['Categoria 4', 'Categoria 5', 'Categoria 6'],  features: ''},
  {name: 'Evento 7', production: 'Produtor 1', rating: 4, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa7.jpg', description: 'Descrição do Evento', categories: ['Categoria 1', 'Categoria 3', 'Categoria 7'],  features: ''},
  {name: 'Evento 8', production: 'Produtor 2', rating: 3, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa8.jpg', description: 'Descrição do Evento', categories: ['Categoria 5'],  features: ''},
];

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
  categorieList: Categorie[] = CATEGORIES;
  produtorList: Production[] = PRODUTOR;
  panelOpenState = false;
  id: number = 0;
  listIds: number[] = [];
  tempEventList: Event[] = []

  constructor(
    private service: EventService
  ) {}

  ngOnInit(): void {
    this.listEvents()
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
}
