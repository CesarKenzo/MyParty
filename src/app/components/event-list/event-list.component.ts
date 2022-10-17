import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { Categorie } from '../categorie';
import { Production } from '../production';
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
  {name: 'Categoria 1', value: 'categoria-1'},
  {name: 'Categoria 2', value: 'categoria-2'},
  {name: 'Categoria 3', value: 'categoria-3'},
  {name: 'Categoria 4', value: 'categoria-4'},
  {name: 'Categoria 5', value: 'categoria-5'},
  {name: 'Categoria 6', value: 'categoria-6'},
  {name: 'Categoria 7', value: 'categoria-7'},
];

const PRODUTOR:Production[] = [
  {name: 'Produtor 1', value: '1'},
  {name: 'Produtor 2', value: '2'},
  {name: 'Produtor 3', value: '3'},
  {name: 'Produtor 4', value: '4'},
  {name: 'Produtor 5', value: '5'},
  {name: 'Produtor 6', value: '6'},
];

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {

  categorieFilter: string | undefined;
  productionFilter: string | undefined;;
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
    } else {
      this.listEvents()
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
    } else {
      this.listEvents()
    }
  }

  listEvents() {
    this.service.listar().subscribe((eventList) => {
      this.eventList = eventList
    }) 
  }
}
