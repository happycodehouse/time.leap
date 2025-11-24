import type { IconType } from "../../types/icon";
import './Dock.scss';

interface DockProps {
    icons: IconType[];
}

export function Dock({icons}: DockProps) {
    return (
        <div className="dock">
            {icons.map(icon => {
                const IconComp = icon.icon;
                return (
                    <div key={icon.id} className="dock-icon">
                        <IconComp size={52}/>
                        <div className="dock-tooltip">{icon.name}</div>
                    </div>
                )
            })}
        </div>
    )
}