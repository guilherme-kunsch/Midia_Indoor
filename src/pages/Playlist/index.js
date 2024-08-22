import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Playlist(){

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
                <h1 className="text-lg font-bold">Playlist</h1>
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


            <div className="mx-64 mt-12 space-y-8 justify-center text-center">
                <div className="justify-center text-center flex">
                    <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg">Nova Playlist</h3>
                </div>

                <div className="w-full flex">
                    <div className="w-2/4 h-70 bg-gray-200 py-2 px-10 rounded-lg mx-8">
                            <h3 className="text-black bg-gray-300 py-4 px-28 my-4 rounded-lg">Midia 1</h3>
                            <h3 className="text-black bg-gray-300 py-4 px-28 my-4 rounded-lg">Midia 2</h3>
                            <h3 className="text-black bg-gray-300 py-4 px-28 my-4 rounded-lg">Midia 3</h3>
                    </div>
                    <div className="w-2/4 h-70 bg-gray-200 py-2 px-10 rounded-lg mx-8">
                            <h3 className="text-black bg-gray-300 py-4 px-28 my-4 rounded-lg">Midia 1</h3>
                            <h3 className="text-black bg-gray-300 py-4 px-28 my-4 rounded-lg">Midia 2</h3>
                            <h3 className="text-black bg-gray-300 py-4 px-28 my-4 rounded-lg">Midia 3</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}