import React, { useEffect } from "react";
import SideBar from '../../components/SideBar'
import { useNavigate } from "react-router-dom";

export default function Gerenciamento(){

    const navigate = useNavigate()

    // useEffect(() => {

    //     const fetchData = async () => {

    //         const response = await fetch("https://mastigadores.fly.dev/midia")
    //         console.log(response.data)
    //     }

    //     fetchData()

    // }, [])

    return (
        <div className="w-full">
            <SideBar
                title={'GERENCIAMENTO'}
            />        


            <div className="mx-80 mt-12 space-y-8 justify-center text-center">
                <div className="justify-center text-center flex">
                    <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg cursor-pointer" onClick={() => navigate('/ImportarMidias')}>Nova Mídia</h3>
                </div>

                <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
                    <div className="justify-between items-center flex">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">Mídia 1</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Editar</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                    </div>
                        {/* <img width={400} src={"https://pi4.fly.storage.tigris.dev/2023-logo-ucl-azul-1_2BJK20PBB18MC.png"} alt="logo" /> */}
                    <div className="justify-between items-center flex my-8">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">Mídia 2</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Editar</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                    </div>
                    <div className="justify-between items-center flex">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">Mídia 3</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Editar</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}