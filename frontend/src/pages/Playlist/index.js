import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import PopUpNovaPlaylist from "./PopUpNovaPlayList";
import { MdSettings } from 'react-icons/md'
import PopUpEditPlaylist from "./PopUpEditPlayList";

export default function Playlist(){

    const [showPopUp, setShowPopUp] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const [ playlists, setPlaylists ] = useState([
        {
            name: 'Guilherme', 
            midias: ['doente.png', 'pateta.jpg', 'sonso.gif']
        },

        {
            name: 'Gabriel', 
            midias: ['parasita.png', 'besta.jpg', 'maluco.gif']
        },

        {
            name: 'Cauan', 
            midias: ['doente.png', 'pateta.jpg', 'ViadinhoPãoComOvo.gif']
        },

        {
            name: 'Carita', 
            midias: ['Testando.png', 'Chamon.jpg', 'Zirlene.gif']
        }
    ])

    const handleNewPlaylistClick = () => {
        setShowPopUp(true);
        console.log(showPopUp)
    };

    const editPlayList = (playlist) => {
        setSelectedPlaylist(playlist);
        setShowPopUpEdit(true);
    };

    return (
        <div className="w-full">
            <SideBar
                title={'PLAYLIST'}
            />

            <div className="justify-end m-4 text-center flex">
                <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg"  onClick={handleNewPlaylistClick}>+ Nova Playlist</h3>
            </div>
            <div className="px-64 mt-12 w-full grid grid-cols-3">
                {playlists.map((play, index) => (

                    <div key={index} className="mb-12 px-4 justify-center text-center">                        

                        <div className="justify-center text-center flex bg-dark-blue p-4 rounded-t-lg">
                            <MdSettings size={20} color="White" onClick={() => editPlayList(play)}/>
                            <h3 className="text-ligth-white w-full mr-6">{play.name}</h3>
                        </div>
                        <div className="w-full flex mt-0 p-0">
                            <div className="w-full h-70 bg-cards  px-10 rounded-b-lg">
                                {play.midias.map((midia, midiaIndex) => (
                                    <h3 key={midiaIndex} className="text-black bg-flash-white py-4 my-4 rounded-lg">{midia}</h3>
                                ))}
                            </div>                    
                        </div>

                    </div>

                ))}
            </div>

            {showPopUp && <PopUpNovaPlaylist setShowPopUp={setShowPopUp}/>}

            {showPopUpEdit && (
                <PopUpEditPlaylist 
                    setShowPopUpEdit={setShowPopUpEdit}
                    playlist={selectedPlaylist} // Passa a playlist selecionada para o popup
                />
            )}

        </div>
    )
}