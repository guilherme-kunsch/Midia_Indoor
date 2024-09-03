import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Midia from "./pages/ImportMidia";
import Dispositivos from "./pages/Dispositivos";
import Playlist from "./pages/Playlist";
import Gerenciamento from "./pages/Gerenciamento";
import PlayContent from './pages/Play/index'
import GerenciarSenhas from "./pages/GerenciarSenhas";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/GerenciarSenhas",
    element: <GerenciarSenhas/>
  },
  {
    path: "/Dispositivos",
    element: <Dispositivos/>
  },
  {
    path: "/Gerenciamento",
    element: <Gerenciamento/>
  },
  {
    path: "/Playlist",
    element: <Playlist/>
  },
  {
    path: "/ImportarMidias",
    element: <Midia/>
  },
  {
      path: "/play/:deviceId",
      element: <PlayContent/>
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
