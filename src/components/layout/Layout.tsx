import { Header } from "./../common/Header";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div id="wrap" className="wrap">
            <Header />
            <div id="container" className="container">
                {children}
            </div>
        </div>
    )
}