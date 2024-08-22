import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function GerenciarSenhas() {

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
                <h1 className="text-lg font-bold">Gerenciar Senhas</h1>
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

            <div className="mx-80 mt-8 p-8 space-y-8">
                {/* Senha Normal */}
                <div className="border border-black rounded-lg p-6 flex flex-col space-y-6">
                    <h2 className="text-center text-black font-semibold">Senha Normal</h2>
                    <div className="flex justify-center">
                        <div className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black">
                            827
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h4 className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black cursor-pointer">
                            Próxima Senha
                        </h4>
                        <h4 className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black cursor-pointer">
                            Senha Anterior
                        </h4>
                        <h4 className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black cursor-pointer">
                            Senha Manual
                        </h4>
                    </div>
                </div>

                {/* Senha Preferencial */}
                <div className="border border-black rounded-lg p-6 flex flex-col space-y-6">
                    <h2 className="text-center text-black font-semibold">Senha Preferencial</h2>
                    <div className="flex justify-center">
                        <div className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black">
                            948
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h4 className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black cursor-pointer">
                            Próxima Senha
                        </h4>
                        <h4 className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black cursor-pointer">
                            Senha Anterior
                        </h4>
                        <h4 className="bg-purple-100 text-black py-2 px-4 rounded-lg border border-black cursor-pointer">
                            Senha Manual
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
