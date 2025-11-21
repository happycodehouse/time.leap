import './Dock.scss';

interface DockProps {
    icons: Array<{
        id: number;
        name: string;
        icon: any;
        x: number;
        y: number;
    }>;
}

export function Dock( { icons }: DockProps ) {
    return (
        <div className="dock">
            {icons.map(icon => {
                const IconComp = icon.icon;
                return (
                    <div key={icon.id} className="dock-icon">
                        <IconComp size={68} />
                    </div>
                )
            })}
        </div>
    )
}