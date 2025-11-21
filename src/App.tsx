import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/common.scss';

import { Layout } from "./components/layout/Layout";
import { Home } from "./components/home/Home";
import { TodoList } from "./components/todo/TodoList";
import { ShoppingList } from "./components/shopping/ShoppingList";
import { SavingsGoal } from "./components/finance/SavingsGoal";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;