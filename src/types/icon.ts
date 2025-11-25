export interface IconType {
    id: number;
    name: string;
    icon: React.ComponentType<{size: number}>;
    x: string | number;
    y: string | number;
    link: string;
    component: React.ComponentType;
}