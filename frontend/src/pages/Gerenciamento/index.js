import React, { useEffect, useState } from "react";
import SideBar from '../../components/SideBar'
import { useNavigate } from "react-router-dom";
import PopUpImage from "./PopUpImage";
import PopUpEditMidia from "./PopUpEditMidia";

import { TiDelete } from "react-icons/ti";

export default function Gerenciamento(){

    const [ showPopUp, setShowPopUp ] = useState(false);
    const [ showPopUpEdit, setShowPopUpEdit ] = useState(false);

    const [ imagem, setImagem ] = useState(null)
    const [ midiaTitle, setMidiaTitle ] = useState(null)

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

    const handleEditClick = (midia) => {
        setMidiaTitle(midia)
        setShowPopUpEdit(true);
    };

    const handleDelete = async (id) => {

        const confirm = window.confirm('Tem certeza que deseja remover essa mídia?')

        if(!confirm){
            return;
        }

        const remove = await fetch(`https://mastigadores.fly.dev/midia/${id}`, {
            method: 'DELETE'
        })

        window.location.reload()

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://mastigadores.fly.dev/midia", {
                    method: 'GET'
                });
                console.log('teste')
                const data = await response.json();
                setMidias(data)
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

            <div className="justify-end text-center flex mx-9 mt-24">
                <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg cursor-pointer" onClick={() => navigate('/ImportarMidias')}>+ Nova Mídia</h3>
            </div>

            <div className="pl-40 w-full grid grid-cols-2">
                {midias.map((midia, index) => (

                    <div key={index} className="w-9/12 h-70 my-9 bg-gray-200  rounded-lg">

                            <div className="justify-center text-center flex bg-dark-blue p-4 rounded-t-lg">
                                <TiDelete  size={22} color="Red" className="cursor-pointer" onClick={() => handleDelete(midia.id)}/>
                                <h1 className="text-ligth-white w-full mr-6">{midia.file_name}</h1>
                            </div>



                            <div className="h-64 justify-center flex text-center m-auto items-center my-4" onClick={() => handleImagemClick(midia.file_url)}>
                                <img className="max-h-64" src={midia.file_url} alt="logo" />
                            </div>

                            {/* <div className="justify-center items-center flex mt-8">
                                <h3 className="text-black bg-green-300 py-4 px-10 rounded-lg" onClick={() => handleEditClick(midia.file_name)}>Editar</h3>
                                <h3 className="text-black bg-red-300 py-4 px-24 rounded-lg cursor-pointer" onClick={() => handleDelete(midia.id)}>Excluir</h3>
                            </div> */}

                        </div>
                ))}
            </div>

            {showPopUp && 
                <PopUpImage 
                setShowPopUp={setShowPopUp}
                    img={imagem}
                />
            }

            {showPopUpEdit &&
                <PopUpEditMidia
                    setShowPopUpEdit={setShowPopUpEdit}
                    Midia={midiaTitle}
                />
            }


        </div>
    )
}