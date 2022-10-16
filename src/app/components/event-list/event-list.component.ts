import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';


export interface Event {
  name: string;
  production: string;
  rating: number;
  image: string;
  description: string;
  categories: string[];
}

export interface Categorie {
  name: string;
}

export interface Produtor {
  name: string;
}

const EVENTS: Event[] = [
  {name: 'Evento 1', production: 'Produtor 1', rating: 5, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa1.jpg', description: 'Descrição do Evento', categories: ['Categoria 1', 'Categoria 2', 'Categoria 3']},
  {name: 'Evento 2', production: 'Produtor 2', rating: 4, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa2.jpg', description: 'Descrição do Evento', categories: ['Categoria 1', 'Categoria 3', 'Categoria 4']},
  {name: 'Evento 3', production: 'Produtor 3', rating: 4, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa3.jpg', description: 'Descrição do Evento', categories: ['Categoria 2', 'Categoria 3', 'Categoria 4']},
  {name: 'Evento 4', production: 'Produtor 4', rating: 5, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa4.jpg', description: 'Descrição do Evento', categories: ['Categoria 3', 'Categoria 5']},
  {name: 'Evento 5', production: 'Produtor 5', rating: 5, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa5.jpg', description: 'Descrição do Evento', categories: ['Categoria 2', 'Categoria 5', 'Categoria 6']},
  {name: 'Evento 6', production: 'Produtor 6', rating: 3, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa6.jpg', description: 'Descrição do Evento', categories: ['Categoria 4', 'Categoria 5', 'Categoria 6']},
  {name: 'Evento 7', production: 'Produtor 1', rating: 4, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa7.jpg', description: 'Descrição do Evento', categories: ['Categoria 1', 'Categoria 3', 'Categoria 7']},
  {name: 'Evento 8', production: 'Produtor 2', rating: 3, image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa8.jpg', description: 'Descrição do Evento', categories: ['Categoria 5']},
];

const CATEGORIES: Categorie[] = [
  {name: 'Categoria 1'},
  {name: 'Categoria 2'},
  {name: 'Categoria 3'},
  {name: 'Categoria 4'},
  {name: 'Categoria 5'},
  {name: 'Categoria 6'},
  {name: 'Categoria 7'},
];

const PRODUTOR:Produtor[] = [
  {name: 'Produtor 1'},
  {name: 'Produtor 2'},
  {name: 'Produtor 3'},
  {name: 'Produtor 4'},
  {name: 'Produtor 5'},
  {name: 'Produtor 6'},
];

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EventListComponent implements OnInit {

  categorieFilter: string = '';
  productionFilter: string = '';
  eventList: Event[] = [];
  categorieList: Categorie[] = [];
  produtorList: Produtor[] = [];
  panelOpenState = false;
  tempEventList: Event[] = [];  

  constructor(
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventList = EVENTS
    this.categorieList = CATEGORIES
    this.produtorList = PRODUTOR
  }

  applyFilter() {
    this.tempEventList = []
    if(this.productionFilter != 'None') {
      for(var i = 0; i < this.eventList.length; i++) {
        var event = this.eventList[i]
        if(event.production == this.productionFilter) {
          this.tempEventList.push(event)
        }
      }
      this.eventList = this.tempEventList
    }

    if(this.categorieFilter != 'None') {
      for(var i = 0; i < this.eventList.length; i++) {
        var event = this.eventList[i]
        for(var j = 0; j < event.categories.length; j++) {
          var categorie = event.categories[j]
          if(categorie == this.categorieFilter) {
            this.tempEventList.push(event)
          }
        }
      }
      this.eventList = this.tempEventList
    }

    this.changeDetection.detectChanges();
  }

  fromCategorie(event: Event) {
    for(var i = 0; i < event.categories.length; i++) {
      var categorie = event.categories[i] 
      return categorie == this.categorieFilter
    }

    return false
  }

  fromProduction(event: Event) {
    if(this.productionFilter != 'None') {
      return event.production == this.productionFilter
    }

    return false
  }
}
