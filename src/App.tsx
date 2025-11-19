import './styles/global.scss';
import { TodoList } from "./components/todo/TodoList";
import { ShoppingList } from "./components/shopping/ShoppingList";
import { SavingsGoal } from "./components/finance/SavingsGoal";

function App() {
    return (
        <div className="app">
            <main className="container">
                <TodoList/>
                <SavingsGoal />
                <ShoppingList/>
            </main>
        </div>
    )
}

export default App