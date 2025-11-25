import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { IconType } from "../../types/icon";
import { initialIcons } from './../../data/iconData';
import { Dock } from './Dock';
import { Window } from '../Window/Window';
import './Home.scss';

interface OpenWindow {
    id: number;
    iconId: number;
    title: string;
    component: React.ComponentType;
}

export function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const isInitialMount = useRef(true); // 추가

    const [icons, setIcons] = useState<IconType[]>(initialIcons);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
    const dragOffsetRef = useRef({x: 0, y: 0});
    const iconSizeRef = useRef({width: 0, height: 0});
    const sectionRef = useRef<HTMLDivElement>(null!);

    // URL에 따라 자동으로 창 열기 (초기 로드 시에만)
    useEffect(() => {
        if (!isInitialMount.current) return; // 초기 로드가 아니면 종료

        const path = location.pathname.replace('/', '');
        if (path && path !== '') {
            const icon = icons.find(i => i.link === path);
            if (icon) {
                const newWindow: OpenWindow = {
                    id: Date.now(),
                    iconId: icon.id,
                    title: icon.name,
                    component: icon.component
                };
                setOpenWindows([newWindow]); // prev 대신 직접 설정
            }
        }

        isInitialMount.current = false; // 초기 로드 완료 표시
    }, []); // 빈 배열: 마운트 시 한 번만 실행

    const handleOpenWindow = (icon: IconType) => {
        const isAlreadyOpen = openWindows.some(w => w.iconId === icon.id);
        if (isAlreadyOpen) return;

        const newWindow: OpenWindow = {
            id: Date.now(),
            iconId: icon.id,
            title: icon.name,
            component: icon.component
        };

        setOpenWindows(prev => [...prev, newWindow]);
        navigate(`/${icon.link}`);
    };

    // 더블클릭으로 창 열기
    const handleDoubleClick = (e: React.MouseEvent, icon: IconType) => {
        e.stopPropagation();
        e.preventDefault();
        handleOpenWindow(icon);
    };

    // 창 닫기
    const handleCloseWindow = (windowId: number) => {
        setOpenWindows(prev => prev.filter(w => w.id !== windowId));

        // 창 닫으면 홈으로 이동
        navigate('/');
    };

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
                        const {width: iconWidth, height: iconHeight} = iconSizeRef.current;

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
            <Dock icons={icons} onIconClick={handleOpenWindow}/>

            {icons.map(icon => {
                const IconComp = icon.icon;

                return (
                    <div
                        key={icon.id}
                        style={{
                            left: icon.x,
                            top: icon.y,
                            cursor: draggingId === icon.id ? 'grabbing' : 'pointer'
                        }}
                        className={`icon-comp ${selectedId === icon.id ? "clicked" : ""} ${draggingId === icon.id ? "dragging" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (draggingId === null) {
                                setSelectedId(icon.id);
                            }
                        }}
                        onMouseDown={(e) => handleMouseDown(e, icon)}
                        onDoubleClick={(e) => handleDoubleClick(e, icon)}
                    >
                        <div>
                            <IconComp size={60}/>
                        </div>
                        <span>{icon.name}</span>
                    </div>
                )
            })}

            {/* 열린 창들 렌더링 */}
            {openWindows.map(window => (
                <Window
                    key={window.id}
                    id={window.id}
                    title={window.title}
                    component={window.component}  // 컴포넌트 전달
                    onClose={() => handleCloseWindow(window.id)}
                />
            ))}
        </section>
    )
}