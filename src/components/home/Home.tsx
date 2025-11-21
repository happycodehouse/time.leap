import { useState, useRef, useEffect } from 'react';
import { initialIcons } from './../../data/iconData';
import { Dock } from './Dock'

import './Home.scss'

export function Home() {
    const [icons, setIcons] = useState(initialIcons);

    return (
        <section className="home-section">
            <Dock icons={icons} />

            {icons.map(icon => {
                const IconComp = icon.icon;
                return (
                    <div
                        key={icon.id}
                        style={{left: icon.x, top: icon.y}}
                        className="icon-comp"
                    >
                        <div>
                            <IconComp size={60}/>
                        </div>
                        <span>
                            {icon.name}
                        </span>
                    </div>
                )
            })}
        </section>
    )
}