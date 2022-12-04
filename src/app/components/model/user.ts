export interface User {
    id?: number;
    name: string;
    username: string;
    password: string;
    profile?: string;
    description?: string;
    favoriteCategories?: string[];
    favoriteEvents?: number[];
}