import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom"

import Teste from "./pages/telateste/teste";


export default function App(){
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Teste/>} />
            </Routes>
        </HashRouter>
    )
}