import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';



export default function Midia(){

  const [ sidebarStatus, setSidebarStatus ] = useState(false);

  const navigate = useNavigate();

  const alterStatusSideBar = () => {
    setSidebarStatus(!sidebarStatus)
  }

  return(
    <div className="w-full">   

      <div className="w-full flex justify-between items-center bg-black text-white py-4 px-6">
        <IoMenu 
            size={30} 
            className="cursor-pointer" 
            onClick={() => alterStatusSideBar()}
        />
        <h1 className="text-lg font-bold">Importar Mídias</h1>
        <h1 className="opacity-0"> </h1>
      </div>

      {sidebarStatus && 
        <>
          <div className="w-1/5 h-screen bg-black z-10 fixed justify-center text-center">
              <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg cursor-pointer" onClick={() => navigate('/Playlist')}>Playlist</h3>
              <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg cursor-pointer" onClick={() => navigate('/Gerenciamento')}>Gerenciamento</h3>
              <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg cursor-pointer" onClick={() => navigate('/GerenciarSenhas')}>Gerenciar Senhas</h3>
              <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg cursor-pointer" onClick={() => navigate('/Dispositivos')}>Dispositivos</h3>
          </div>
        </>
      }
      <div className="w-full justify-center text-center flex">
        <label htmlFor="file-input" className="relative w-96 h-64 bg-white rounded-lg flex items-center justify-center cursor-pointer my-32">
          <div className="absolute inset-0 m-3 p-4 border-dashed border-2 border-gray-400 rounded-md flex items-center justify-center bg-white active:bg-blue-900">
            <p className="text-center font-semibold">Selecione um arquivo ou solte aqui.</p>
          </div>
          <input type="file" id="file-input" className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
      </div>
    </div>
)
}