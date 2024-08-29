import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

export default function PopUpNovaPlaylist({ setShowPopUp }) {

    const [ titlePlayList, setTitlePlaylist ] = useState('')

    const [ midias, setMidias ] = useState([])

    const [ midiasPlayList, setMidiasPlaylist ] = useState([])

    const filterMidias = midias.filter(midia => !midiasPlayList.find(midiaPlaylist => midiaPlaylist.id === midia.id))

    const closeModal = () => {
        setShowPopUp(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
    };

    const savePlay = async () => {

        try{
            
            if(titlePlayList === '' || midiasPlayList.length === 0){
                alert("Gentileza preencher todos os campos")
                return;
            }
            
            const midiasData = midiasPlayList.map(midia => ({
                midia_id: midia.id, 
                file_name: midia.file_name
            }));
            
            const data = {
                name: titlePlayList,
                midias: midiasData
            }
            
            
            await fetch("https://mastigadores.fly.dev/playlist", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            alert("PlayList cadastrada com sucesso!")

            window.location.reload()

        }catch(error){
            alert('Erro ao cadastrar playlist, procure os mastigadores.')
            console.error(error.message)
        }
    }


    useEffect(() => {

        const fetchData = async () => {
            try {
              const response = await fetch("https://mastigadores.fly.dev/midia", {
                method: "GET",
              });
              const data = await response.json();
              setMidias(data);
            } catch (error) {
              console.error("Erro ao buscar dados:", error);
            }
          };
      
          fetchData();

    }, [])

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen">
            <div className="absolute inset-0 bg-black opacity-30"></div> {/* Fundo escuro semi-transparente */}

            <Popup open={true} onClose={closeModal} modal nested>
                <div className="w-screen justify-center text-center flex">
                    <div className="w-9/12 h-3/4 bg-white rounded-lg shadow-md shadow-dark-blue">
                        <div className="justify-center text-center">
                            <h2 className="text-ligth-white font-bold text-xl p-4 bg-dark-purple rounded-t-lg">CADASTRAR PLAYLIST</h2>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="mx-12 my-4">
                                <label className="block text-black mb-2">Nome da Playlist:</label>
                                <input type="text" className="w-full px-3 py-2 border border-dark-blue rounded-lg mb-8" value={titlePlayList} onChange={(e) => setTitlePlaylist(e.target.value)} required />

                                <div className="justify-between flex">
                                    <div className="w-2/4">
                                        <h3 className="text-black">Mídias</h3>
                                        <div className="bg-white text-black h-72 border border-dark-blue pb-24 overflow-scroll">
                                            {filterMidias.map((midia, index) => (
                                                <div 
                                                    key={index} 
                                                    className="text-start my-2 py-1 px-2 hover:bg-dark-blue hover:text-white rounded-lg" 
                                                    onClick={() => setMidiasPlaylist(state => [...state, midia])}
                                                >
                                                    <span className="text-sm">{midia.file_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid text-white my-24 px-4">
                                        <FaAnglesLeft 
                                            className="rounded-full bg-dark-purple w-5 h-5 p-0.5 cursor-pointer"
                                            onClick={() => setMidiasPlaylist([])}
                                        />
                                        <FaAnglesRight 
                                            className="rounded-full bg-dark-purple w-5 h-5 p-0.5 cursor-pointer"
                                            onClick={() => setMidiasPlaylist(midias)}/>
                                    </div>

                                    <div className="w-2/4 h-full mb-12">
                                        <h3 className="text-black">Selecionadas</h3>
                                        <div className="bg-white text-black h-72 border border-dark-blue pb-24 overflow-scroll">
                                            {midiasPlayList.map((midia, index) => (
                                                <div 
                                                    key={index} 
                                                    className="text-start my-2 py-1 px-2 hover:bg-dark-blue hover:text-white rounded-lg" 
                                                    onClick={() => setMidiasPlaylist(state => state.filter(midiaPlaylist => midiaPlaylist.id !== midia.id))}
                                                >
                                                    <span className="text-sm">{midia.file_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="justify-center w-full mb-6">
                                <button type="button" className=" w-36  px-4 py-2 bg-red-500 text-white rounded-lg" onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="ml-10 w-36 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => savePlay()}>
                                    Salvar
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </Popup>
        </div>
    );
}
