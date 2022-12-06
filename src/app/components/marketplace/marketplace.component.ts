import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie';
import { Event } from '../model/event';
import { Marketplace_Ticket } from '../model/marketplace-ticket';
import { Production } from '../model/production';
import { CategorieService } from '../service/categorie.service';
import { EventService } from '../service/event.service';
import { MktTicketService } from '../service/marketplace_ticket.service';

const PRODUTOR:Production[] = [
  {name: 'Comissão de festas EACH-USP', value: '1'},
  {name: 'Associação Universitária', value: '2'},
  {name: 'Eventim', value: '3'},
];

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  categorieFilter: string = 'None';
  productionFilter: string = 'None';
  
  ticketList: Marketplace_Ticket[] = [];
  categorieList: Categorie[] = [];
  produtorList: Production[] = PRODUTOR;

  pageSize = 10;

  event: Event = {
    name: '',
    production: '',
    rating: 0,
    image: '',
    description: '',
    categories: [],
    features: '',
    date: new Date()
  }

  constructor(
    private service: MktTicketService,
    private categorieService: CategorieService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((ticketList) => {
      this.ticketList = ticketList.filter(t => t.flSold == false)

      this.categorieService.listar().subscribe((categorieList) => {
        this.categorieList = categorieList
      })
    }) 
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
    let tempTicketList = []

    if(this.categorieFilter != 'None') {
      for(var x = 0; x < this.ticketList.length; x++) {
        this.eventService.buscarPorId(this.ticketList[x].eventId).subscribe((event) => {
          this.event = event
        })
        
        for(var y = 0; y < this.event.categories.length; y++) {
          let c = this.event.categories[y]
          if(c == this.categorieFilter) {
            tempTicketList.push(this.ticketList[x])
          }
        }
      }
      this.ticketList = tempTicketList
    }  
  }

  applyFilterProduction(){
    let tempTicketList = []

    if(this.productionFilter != 'None') {
      for(var x = 0; x < this.ticketList.length; x++) {
        this.eventService.buscarPorId(this.ticketList[x].eventId).subscribe((event) => {
          this.event = event
        })

        if(this.event.production == this.productionFilter) {
          tempTicketList.push(this.ticketList[x])
        }
      }
      this.ticketList = tempTicketList
    } 
  }

  listTickets() {
    this.service.listar().subscribe((ticketList) => {
      this.ticketList = ticketList.filter(t => t.flSold == false)
    }) 
  }
}
