import { useLocalStorage } from './useLocalStorage';
import type { ShoppingItem } from '../types/shopping';
import { v4 as uuidv4 } from 'uuid';

export function useShopping() {
    const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping', []);

    // 추가
    const addItem = (item: Omit<ShoppingItem, 'id' | 'createdAt' | 'purchased'>) => {
        const newItem: ShoppingItem = {
            ...item,
            id: uuidv4(),
            purchased: false,
            createdAt: new Date().toISOString(),
        };
        setItems([...items, newItem]);
    };

    // 구매 완료/취소 토글
    const togglePurchased = (id: string) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, purchased: !item.purchased } : item
            )
        );
    };

    // 삭제
    const deleteItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    // 총 예상 금액
    const totalPrice = items
        .filter((item) => !item.purchased && item.price)
        .reduce((sum, item) => sum + (item.price || 0), 0);

    return {
        items,
        addItem,
        togglePurchased,
        deleteItem,
        totalPrice,
    };
}