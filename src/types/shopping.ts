export interface ShoppingItem {
    id: string;
    title: string;
    price?: number;
    purchased: boolean;
    priority?: 'low' | 'medium' | 'high';
    createdAt: string;
}