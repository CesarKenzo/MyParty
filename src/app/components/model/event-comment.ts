export interface EventComment {
    id?: number;
    eventId: number;
    eventName: string;
    userId: string;
    username: string;
    content: string;
    score: number;
}