import { useState, useRef, useEffect } from 'react';
import type { IconType } from "../../types/icon";
import { initialIcons } from './../../data/iconData';
import { Dock } from './Dock';
import './Home.scss';

export function Home() {
    const [icons, setIcons] = useState<IconType[]>(initialIcons);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const iconSizeRef = useRef({ width: 0, height: 0 }); // 아이콘 실제 크기 저장
    const sectionRef = useRef<HTMLDivElement>(null);

    // 드래그 중 마우스 이동 처리
    useEffect(() => {
        if (draggingId === null) return;

        const handleMouseMove = (e: MouseEvent) => {
            setIcons(prevIcons =>
                prevIcons.map(icon => {
                    if (icon.id === draggingId) {
                        // 화면 경계 계산
                        const section = sectionRef.current;
                        if (!section) return icon;

                        const sectionRect = section.getBoundingClientRect();
                        const { width: iconWidth, height: iconHeight } = iconSizeRef.current;

                        // 새로운 위치 계산
                        let newX = e.clientX - dragOffsetRef.current.x;
                        let newY = e.clientY - dragOffsetRef.current.y;

                        // 경계 제한
                        newX = Math.max(0, Math.min(newX, sectionRect.width - iconWidth));
                        newY = Math.max(0, Math.min(newY, sectionRect.height - iconHeight));

                        return {
                            ...icon,
                            x: newX,
                            y: newY
                        };
                    }
                    return icon;
                })
            );
        };

        const handleMouseUp = () => {
            setDraggingId(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingId]);

    // 드래그 시작
    const handleMouseDown = (e: React.MouseEvent, icon: IconType) => {
        e.stopPropagation();
        setSelectedId(icon.id);
        setDraggingId(icon.id);

        // 아이콘의 실제 크기와 마우스 offset 저장
        const rect = e.currentTarget.getBoundingClientRect();

        iconSizeRef.current = {
            width: rect.width,
            height: rect.height
        };

        dragOffsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    return (
        <section
            ref={sectionRef}
            className="home-section"
            onClick={() => setSelectedId(null)}
        >
            <Dock icons={icons}/>

            {icons.map(icon => {
                const IconComp = icon.icon;

                return (
                    <div
                        key={icon.id}
                        style={{
                            left: icon.x,
                            top: icon.y,
                            cursor: draggingId === icon.id ? 'grabbing' : 'grab'
                        }}
                        className={`icon-comp ${selectedId === icon.id ? "clicked" : ""} ${draggingId === icon.id ? "dragging" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (draggingId === null) {
                                setSelectedId(icon.id);
                            }
                        }}
                        onMouseDown={(e) => handleMouseDown(e, icon)}
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