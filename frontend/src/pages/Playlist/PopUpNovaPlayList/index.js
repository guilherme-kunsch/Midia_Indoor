import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Preview from "../../../components/Preview";

import api from "../../../api/api";

export default function PopUpNovaPlaylist({ setShowPopUp }) {

    const [titlePlayList, setTitlePlaylist] = useState('')
    const [previewModal, setPreviewModal] = useState(false)
    const [selectedPreviewMidia, setSelectedPreviewMidia] = useState(null)
    const [selectedMidia, setSelectedMidia] = useState([])
    const [midias, setMidias] = useState([])

    const [filterMidias, setFilterMidias] = useState([])
    const closeModal = () => {
        setShowPopUp(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
    };

    const openPreviewModal = (midia) => {
        setSelectedPreviewMidia(midia)
        setPreviewModal(true)
    }
    const closePreviewModal = () => {
        setPreviewModal(false)
        setSelectedPreviewMidia(null)
    }
    const savePlay = async () => {

        try {
            const midiasId = selectedMidia.map(midia => midia.id)
            const data = {
                name: titlePlayList,
                midias_id: midiasId
            }
            const response = await api.post(`/playlist`, data)
            if (response.status === 200) {
                alert("PlayList salva com sucesso!")
                window.location.reload()
            }


        } catch (error) {
            alert('Erro ao cadastrar playlist, procure os mastigadores.')
            console.error(error.message)
        }
    }
    const fetchData = async () => {
        const response = await api.get("/midia")
        if (response.status === 200) {
            const midias = response.data
            if (midias) {
                setMidias(midias)
            }
        }

    }
    const removeMedia = (media) => {
        setMidias(state => [...state, media])
        setSelectedMidia(selectedMidia.filter(m => m.id != media.id))
    }
    useEffect(() => {
        fetchData();

    }, [])
    return (


        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen">
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <Popup open={true} onClose={closeModal} modal nested>
                <div className="w-screen justify-center text-center flex">
                    <div className="w-9/12 h-3/4 bg-white rounded-lg shadow-md shadow-dark-blue">
                        <div className="justify-center text-center">
                            <h2 className="text-white font-bold text-xl p-4 bg-dark-purple rounded-t-lg">Cadastrar PlayList</h2>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="mx-12 my-4">
                                <label className="block text-black mb-2">Nome da Playlist:</label>
                                <input type="text" className="w-full px-3 py-2 border text-black border-dark-blue rounded-lg mb-8" value={titlePlayList} onChange={(e) => setTitlePlaylist(e.target.value)} required />

                                <div className="justify-between flex">
                                    <div className="w-2/4">
                                        <h3 className="text-black">Mídias</h3>
                                        <div className="bg-white text-black h-72 border border-dark-blue pb-24 overflow-scroll">
                                            {midias.map((midia, index) => (
                                                <div
                                                    key={index}
                                                    className="flex text-start my-2 py-1 px-2 hover:bg-dark-blue hover:text-white rounded-lg justify-between"
                                                >
                                                    <span className="text-sm">{midia.file_name}</span>
                                                    <div className="">
                                                        <button className="text-sm w-20 bg-blue-500 rounded-lg mr-5" type="button" onClick={() => openPreviewModal(midia)}>Preview</button>
                                                        <button className="text-sm w-20 bg-green-500 rounded-lg" type="button" onClick={() => {
                                                            setSelectedMidia(state => [...state, midia])
                                                            setMidias(midias.filter(m => m.id != midia.id))
                                                        }}>Selecionar</button>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid text-white my-24 px-4">
                                        {/* <FaAnglesLeft 
                                            className="rounded-full bg-dark-purple w-5 h-5 p-0.5 cursor-pointer"
                                            onClick={() => setSelectedMidia([])}
                                        />
                                        <FaAnglesRight 
                                            className="rounded-full bg-dark-purple w-5 h-5 p-0.5 cursor-pointer"
                                            onClick={() => setSelectedMidia(midias)}/> */}
                                    </div>

                                    <div className="w-2/4 h-full mb-12">
                                        <h3 className="text-black">Selecionadas</h3>
                                        <div className="bg-white text-black h-72 border border-dark-blue pb-24 overflow-scroll">
                                            {selectedMidia.map((midia, index) => (
                                                <div
                                                    key={index}
                                                    className="flex text-start my-2 py-1 px-2 hover:bg-dark-blue hover:text-white rounded-lg justify-between"
                                                >
                                                    <span className="text-sm">{midia.file_name}</span>
                                                    <button type="button" className="text-sm w-20 rounded-lg bg-red-500" onClick={() => removeMedia(midia)}>Remover</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-center w-full mb-6">
                                <button type="button" className=" w-36  px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="ml-10 w-36 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => savePlay()}>
                                    Salvar
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
                {previewModal && <Preview midia={selectedPreviewMidia} closePreviewModal={closePreviewModal} />}
            </Popup>

        </div>
    );
}
