import { Event } from "./event"
import { Ticket } from "./ticket"
import { User } from "./user"

export interface UserTicket {
    id?: number
    event: Event
    user: User
    ticket: Ticket
} 