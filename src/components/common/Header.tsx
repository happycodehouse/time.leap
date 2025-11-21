import './Header.scss';
import { CurrentTime } from './CurrentTime';


export function Header() {
    return (
        <header className="header">
            <div className="logo">
                happycodehouse
            </div>
            <div className="time">
                <CurrentTime />
            </div>
        </header>
    )
}