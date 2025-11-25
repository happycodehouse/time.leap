import { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

import './Window.scss';

interface WindowProps {
    id: number;
    title: string;
    component: React.ComponentType;
    onClose: () => void;
}

export function Window({ id, title, component: ContentComponent, onClose }: WindowProps) {
    const [position, setPosition] = useState(() => {
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;

        return {
            x: 100 + randomX,
            y: 100 + randomY
        };
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX - dragOffsetRef.current.x,
                y: e.clientY - dragOffsetRef.current.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging]);

    const handleHeaderMouseDown = (e: React.MouseEvent) => {
        const rect = windowRef.current?.getBoundingClientRect();
        if (!rect) return;

        setIsDragging(true);
        dragOffsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    return (
        <div
            ref={windowRef}
            className="window"
            style={{
                left: position.x,
                top: position.y
            }}
            onMouseDown={handleHeaderMouseDown}
        >
            <div
                className="window-header"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <button
                    className="window-btn red"
                    type="button"
                    onClick={onClose}
                >
                    {isHovered && <X size={10} strokeWidth={2.5} />}
                </button>
                <button
                    className="window-btn yellow"
                    type="button"
                    onClick={onClose}
                >
                    {isHovered && <Minus size={10} strokeWidth={2.5} />}
                </button>
                <button className="window-btn green" type="button">
                    {isHovered && <Maximize2 size={8} strokeWidth={2.5} />}
                </button>
                <span className="window-title">{title}</span>
            </div>
            <div className="window-content">
                <ContentComponent />
            </div>
        </div>
    )
}