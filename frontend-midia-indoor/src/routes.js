import React, { Fragment } from "react";
import { HashRouter, Route, Routes } from "react-router-dom"

import GerenciarSenhas from "./pages/GerenciarSenhas";
import Home from "./pages/Home";
import { Midia } from "./pages/ImportMidia/Midia";


export default function App(){
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Fragment>
                    <Route 
                        exact path="/GerenciarSenhas"
                        element={<GerenciarSenhas/>}
                    />
                      <Route  path="/ImportarMidias" element={<Midia/>}/>
                </Fragment>
              
            </Routes>
        </HashRouter>
    )
}