import React, { Fragment } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import GerenciarSenhas from "./pages/GerenciarSenhas";
import Home from "./pages/Home";
import Midia from "./pages/ImportMidia";
import Dispositivos from "./pages/Dispositivos";
import Playlist from "./pages/Playlist";
import Gerenciamento from "./pages/Gerenciamento";
import MidiaHtml from "./pages/ImportMidia/midiaHtml";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Fragment>
          <Route exact path="/GerenciarSenhas" element={<GerenciarSenhas />} />

          <Route exact path="/Dispositivos" element={<Dispositivos />} />

          <Route exact path="/Gerenciamento" element={<Gerenciamento />} />

          <Route exact path="/Playlist" element={<Playlist />} />

          <Route exact path="/ImportarMidias" element={<Midia />} />

          <Route exact path="/ImportarMidiasHtml" element={<MidiaHtml />} />
        </Fragment>
      </Routes>
    </HashRouter>
  );
}

