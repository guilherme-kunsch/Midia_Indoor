import React, { useEffect, useState } from "react";
import SideBar from '../../components/SideBar'
import { useNavigate } from "react-router-dom";
import PopUpImage from "./PopUpImage";

export default function Gerenciamento(){

    const [showPopUp, setShowPopUp] = useState(false);

    const [ imagem, setImagem ] = useState(null)

    const [ midias, setMidias ] = useState([
        {url: "https://pi4.fly.storage.tigris.dev/2023-logo-ucl-azul-1_2BJK20PBB18MC.png", title: 'GUILHERME'},
        {url: "https://pi4.fly.storage.tigris.dev/2023-logo-ucl-azul-1_2BJK20PBB18MC.png", title: 'JOÃO VICTOR'},
        {url: "https://pi4.fly.storage.tigris.dev/2023-logo-ucl-azul-1_2BJK20PBB18MC.png", title: 'CARITA'},
        {url: "https://pi4.fly.storage.tigris.dev/2023-logo-ucl-azul-1_2BJK20PBB18MC.png", title: 'GABRIEL'},
        {url: "https://pi4.fly.storage.tigris.dev/2023-logo-ucl-azul-1_2BJK20PBB18MC.png", title: 'CAUAN'},
    ])

    const navigate = useNavigate()

    const handleImagemClick = (img) => {
        setImagem(img)
        setShowPopUp(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://mastigadores.fly.dev/midia", {
                    method: 'GET'
                });
                console.log('teste')
                const data = await response.json();
                console.log(data); 
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div className="w-full">
            <SideBar
                title={'GERENCIAMENTO'}
            />        

            <div className="justify-end text-center flex mx-14 mt-9">
                <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg cursor-pointer" onClick={() => navigate('/ImportarMidias')}>Nova Mídia</h3>
            </div>

            <div className="mx-36 w-full grid grid-cols-2">
                {midias.map((midia, index) => (

                        <div key={index} className="w-9/12 h-70 my-12 bg-gray-200 py-8 px-20 rounded-lg">

                            <h1 className="text-black w-full text-center">{midia.title}</h1>

                            <div className=" items-center my-8" onClick={() => handleImagemClick(midia.url)}>
                                <img width={400} src={midia.url} alt="logo" />
                            </div>

                            <div className="justify-between items-center flex mt-8">
                                <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg">Editar</h3>
                                <h3 className="text-black bg-red-300 py-4 px-10 rounded-lg">Excluir</h3>
                            </div>

                        </div>
                ))}
            </div>

            {showPopUp && 
                <PopUpImage 
                    setShowPopUp={setShowPopUp}
                    img={imagem}
                />
            }


        </div>
    )
}