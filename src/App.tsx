import './styles/global.scss';
import { Header } from './components/common/Header';
import { TodoList } from "./components/todo/TodoList";
import { ShoppingList } from "./components/shopping/ShoppingList";
import { SavingsGoal } from "./components/finance/SavingsGoal";

function App() {
    return (
        <div className="app">
            {/*<Header/>*/}
            <main className="container">
                <TodoList/>
                <SavingsGoal />
                <ShoppingList/>
            </main>
        </div>
    )
}

export default App