import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function PopUpNewDisp({ setShowPopUp }) {

    const [ playlists, setPlaylists ] = useState([])

    const [ playlistDisp, setPlaylistDisp ] = useState('')

    const [ nomeDisp, setNomeDisp ] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch("https://mastigadores.fly.dev/playlist", {
                method: "GET",
              });
              const data = await response.json();
              setPlaylists(data);

            } catch (error) {
              console.error("Erro ao buscar dados:", error);
            }
          };
      
          fetchData();
    }, [])

    const Save = async () => {

        try{
            
            const data = {
                name: nomeDisp,
                playlist_id: playlistDisp
            }
            
            await fetch("https://mastigadores.fly.dev/device", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            alert('Dispositivo salvo com sucesso.')
            window.location.reload()

        }catch(error){
            alert('Erro ao publicar dispositivo')
            console.error('error: ', error.message)
        }
    }

    const closeModal = () => {
        setShowPopUp(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
    };

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black opacity-30"></div> {/* Fundo escuro semi-transparente */}

            <Popup open={true} onClose={closeModal} modal nested>
                <div className="w-96 h-96 bg-white rounded-lg shadow-md shadow-dark-blue">

                    <div className="justify-center text-center">
                        <h2 className="text-ligth-white font-bold text-xl p-4 bg-dark-purple rounded-t-lg">Novo Dispositivo</h2>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="m-12">
                            <label className="block text-black mb-2">Nome do Dispositivo:</label>
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 border rounded-lg text-black" 
                                value={nomeDisp} 
                                onChange={(e) => setNomeDisp(e.target.value)}
                                required 
                            />
                            
                            <label className="block text-black my-2">Playlist:</label>
                            <select 
                                className="w-full px-3 py-2 border rounded-lg text-black" 
                                onChange={(e) => setPlaylistDisp(e.target.value)}
                            >
                                <option value="">Nenhuma</option>
                                {playlists.map((play, index) => (
                                    <option value={play.id}>{play.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="absolute justify-center bottom-0 w-full mb-8">
                            <button type="button" className="right-10 w-36 absolute px-4 py-2 bg-red-500 text-white rounded-lg" onClick={closeModal}>
                                Cancelar
                            </button>
                            <button type="submit" onClick={() => Save()} className="ml-10 w-36 px-4 py-2 bg-blue-500 text-white rounded-lg">
                                Salvar
                            </button>
                        </div>

                    </form>

                </div>
            </Popup>
        </div>
    );
}
