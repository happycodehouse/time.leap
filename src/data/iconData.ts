import type { IconType } from "./../types/icon";
import { FolderIcon } from './../assets/icons/FolderIcon';
import { NoteIcon } from './../assets/icons/NoteIcon';
import { TodoList } from './../components/todo/TodoList';
import { ShoppingList } from './../components/shopping/ShoppingList';
import { SavingsGoal } from './../components/finance/SavingsGoal';

export const initialIcons: IconType[] = [
    {
        id: 1,
        name: 'monthly',
        icon: NoteIcon,
        x: "76%",
        y: "50%",
        link: 'monthly',
        component: TodoList  // 컴포넌트 추가
    },
    {
        id: 2,
        name: 'saving',
        icon: FolderIcon,
        x: "88%",
        y: "24%",
        link: 'saving',
        component: SavingsGoal  // 컴포넌트 추가
    }
];