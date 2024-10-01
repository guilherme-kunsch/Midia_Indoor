import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import api from "../../../api/api";
export default function EditDeviceModal({ closeEditDeviceModal, device }) {

    const [ playlists, setPlaylists ] = useState([])

    const [ playlistDisp, setPlaylistDisp ] = useState(null)
    const [playListId, setPlayListId] = useState("")
    const [ nomeDisp, setNomeDisp ] = useState(device.name)
    const fetchData = async () => {
        try {
        
          const response = await api.get(`/playlist`);
          const data = response.data;
          setPlaylists(data);

        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
  

    useEffect(() => {
          fetchData();
    }, [])
    const fetchPlaylist = async (id) => {
        const response = await api.get(`/playlist/${id}`)
        if(response.status === 200) {
            const data = response.data
            setPlaylistDisp(data)
        }
    }
    useEffect(() => {
        if(device.playlist_id) {
            fetchPlaylist(device.playlist_id)
        }
    }, [device])
    const Save = async () => {
        try{
            
            const data = {
                name: nomeDisp,
                playlist_id: playListId
            }
            
            const response = await api.patch(`/device/${device.id}`, data);
            if(response.status === 200) {
                alert('Dispositivo atualizado com sucesso.')
                window.location.reload()
            }

        }catch(error){
            alert('Erro ao publicar dispositivo')
            console.error('error: ', error.message)
        }
    }

    const closeModal = () => {
        closeEditDeviceModal();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
    };

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <Popup open={true} onClose={closeModal} modal nested>
                <div className="w-96 h-96 bg-white rounded-lg shadow-md shadow-dark-blue">

                    <div className="justify-center text-center">
                        <h2 className="text-white font-bold text-xl p-4 bg-dark-purple rounded-t-lg">Editar Dispositivo</h2>
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
                                onChange={(e) => setPlayListId(e.target.value)}
                            >
                             (<option value="">Nenhuma</option>)
                                {playlists && playlists.map((play, index) => (
                                    <option key={index} value={play.id} selected={playlistDisp && play.name === playlistDisp.name}>{play.name}</option>
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
