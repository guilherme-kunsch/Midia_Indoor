import React from "react";
import SideBar from "../../components/SideBar";

export default function GerenciarSenhas(){

    return (
        <div className="w-full">
            <SideBar
                title={'GERENCIAR SENHAS'}
            />  

            <div className="mx-80 mt-24 space-y-8 justify-center text-center">
                <div className="justify-center text-center flex">
                    <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg">Novo Dispositivo</h3>
                </div>

                <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
                    <div className="justify-between items-center flex">
                        <h3 className="text-black bg-gray-300 py-4 px-28 rounded-lg">001</h3>
                        <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">002</h3>
                        <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">003</h3>
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