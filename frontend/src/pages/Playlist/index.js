import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import PopUpNovaPlaylist from "./PopUpNovaPlayList";
import { MdSettings } from 'react-icons/md'
import PopUpEditPlaylist from "./PopUpEditPlayList";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from "../../api/api";
import TextView from "../../components/TextView";
export default function Playlist() {

    const [showPopUp, setShowPopUp] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [playlists, setPlaylists] = useState([])
    const fetchData = async () => {
        const response = await api.get("/playlist")
        if(response.status === 200) setPlaylists(response.data)
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleNewPlaylistClick = () => {
        setShowPopUp(true);
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
                <h3 className="text-black text-sm bg-green-300 p-2 w-40 mt-16 rounded-lg cursor-pointer" onClick={handleNewPlaylistClick}>+ Nova Playlist</h3>
            </div>

            <div className="px-64 mt-4 w-full grid grid-cols-2">
                {playlists && playlists.map((play, index) => (

                    <div key={index} className="mb-12 px-4 justify-center text-center">

                        <div className="justify-center text-center flex bg-dark-blue p-4 rounded-t-lg">
                            <button><MdSettings size={20} color="White" onClick={() => editPlayList(play)} /></button>

                            <h3 className="text-white w-full mr-6">{play.name}</h3>
                        </div>
                        <div className="w-full flex mt-0 p-0">
                            <div className="w-full h-70 bg-cards  px-10 rounded-b-lg">

                                <Carousel
                                    responsive={responsive}
                                    swipeable={true}
                                    draggable={true}
                                    showDots={true}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={3000}
                                    keyBoardControl={true}
                                    customTransition="all 0.5s"
                                    transitionDuration={500}
                                    containerClass="carousel-container z-0"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                >
                                    {play.midias ? play.midias.map((midia, midiaIndex) => {
                                        return (
                                            // <h3 key={midiaIndex} className="text-black bg-flash-white py-4 my-4 rounded-lg">{midia.file_name}</h3>
                                            <div key={midiaIndex} className="w-full flex justify-center text-center my-6">
                                                {midia && midia.file_type === "image" && (
                                                    <img src={midia.file_url} alt={midia.file_name} className="max-w-full h-auto" />
                                                )}
                                                {midia && midia.file_type === "video" && (
                                                    <video src={midia.file_url} controls className="max-w-full h-auto" />
                                                )}
                                                {midia && midia.file_type === "text" && (
                                                    <div className="max-w-full h-auto text-black"> <TextView id={midia.id} /> </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    ) : <div />}
                                </Carousel>
                            </div>
                        </div>

                    </div>

                ))}
            </div>

            {showPopUp && <PopUpNovaPlaylist setShowPopUp={setShowPopUp} />}

            {showPopUpEdit && (
                <PopUpEditPlaylist
                    setShowPopUpEdit={setShowPopUpEdit}
                    playlist={selectedPlaylist} // Passa a playlist selecionada para o popup
                />
            )}

        </div>
    )
}