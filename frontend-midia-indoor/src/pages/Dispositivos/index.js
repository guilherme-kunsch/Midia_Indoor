import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function Dispositivos(){

    const [ sidebarStatus, setSidebarStatus ] = useState(false);

    const navigate = useNavigate();

    const alterStatusSideBar = () => {
        setSidebarStatus(!sidebarStatus)
    }

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center bg-black text-white py-4 px-6">
                <IoMenu 
                    size={30} 
                    className="cursor-pointer" 
                    onClick={() => alterStatusSideBar()}
                />
                <h1 className="text-lg font-bold">Dispositivos</h1>
                <h1 className="opacity-0"> </h1>
            </div>

            {sidebarStatus && 
                <>
                    <div className="w-1/5 h-screen bg-black z-10 fixed justify-center text-center">
                        <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg" onClick={() => navigate('/Playlist')}>Playlist</h3>
                        <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg" onClick={() => navigate('/Gerenciamento')}>Gerenciamento</h3>
                        <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg" onClick={() => navigate('/GerenciarSenhas')}>Gerenciar Senhas</h3>
                        <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg" onClick={() => navigate('/Senhas')}>Senhas</h3>
                        <h3 className="bg-white opacity-90 text-black mx-8 my-4 rounded-lg" onClick={() => navigate('/Dispositivos')}>Dispositivos</h3>
                    </div>
                </>
            }

            <div className="mx-80 mt-12 space-y-8 justify-center text-center">
                <div className="justify-center text-center flex">
                    <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg">Novo Dispositivo</h3>
                </div>

                <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
                    <div className="justify-between items-center flex">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">Dispositivo 1</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Playlist</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                    </div>
                    <div className="justify-between items-center flex my-8">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">Dispositivo 2</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Playlist</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                    </div>
                    <div className="justify-between items-center flex">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">Dispositivo 3</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Playlist</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}