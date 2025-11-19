import { useLocalStorage } from '../../hooks/useLocalStorage';
import './SavingsGoal.scss';

export function SavingsGoal() {
    const savingsBlocks = [
        200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800,
    ];

    const totalGoal = 2800;

    const [clickedBlocks, setClickedBlocks] = useLocalStorage<number[]>(
        'savings-blocks',
        []
    );

    const currentTotal = clickedBlocks.length * 200;
    const percentage = Math.round((clickedBlocks.length / savingsBlocks.length) * 100);

    const handleBlockClick = (value: number) => {
        if (clickedBlocks.includes(value)) {
            setClickedBlocks(clickedBlocks.filter((v) => v !== value));
        } else {
            setClickedBlocks([...clickedBlocks, value]);
        }
    };

    return (
        <section className="savings-section">
            <div className="progress-bar">
                <div className="progress-fill" style={{width: `${percentage}%`}}></div>
                <span className={`progress-text ${percentage === 0 ? 'init' : ''}`}>{percentage}%</span>
            </div>

            <ul className="savings">
                {savingsBlocks.map((value) => (
                    <li
                        key={value}
                        className={clickedBlocks.includes(value) ? 'active' : ''}
                        onClick={() => handleBlockClick(value)}
                    >
                        <span>{value}</span>
                    </li>
                ))}
            </ul>

            <div className="savings-total">
                {currentTotal.toLocaleString()} / {totalGoal.toLocaleString()}
            </div>
        </section>
    );
}