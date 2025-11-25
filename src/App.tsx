import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/common.scss';

import { Layout } from "./components/layout/Layout";
import { Home } from "./components/home/Home";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/*" element={<Home />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;