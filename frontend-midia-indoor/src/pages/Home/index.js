import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/fundoFaculdade.jpg'

export default function Home() {

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
                <h1 className="text-lg font-bold">Home</h1>
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

            <div 
                className="text-center bg-cover bg-center flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${logo})`, height: '89.5vh' }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded-md shadow-lg">
                    <h1 className='text-white text-4xl font-bold'>MASTIGADORES</h1>
                    <h1 className='text-white text-4xl font-bold'>UCL 2024</h1>
                </div>
            </div>
        </div>
    )
}