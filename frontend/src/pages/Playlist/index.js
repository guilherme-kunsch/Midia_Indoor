import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import PopUpNovaPlaylist from "./PopUpNovaPlayList";
import { MdSettings } from 'react-icons/md'
import PopUpEditPlaylist from "./PopUpEditPlayList";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Playlist(){

    const [showPopUp, setShowPopUp] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
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

    const [ playlists, setPlaylists ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch("https://mastigadores.fly.dev/playlist", {
                method: "GET",
              });
              const data = await response.json();
              console.log(data)
              setPlaylists(data);
            } catch (error) {
              console.error("Erro ao buscar dados:", error);
            }
          };
      
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
                <h3 className="text-black text-sm bg-green-300 p-2 w-40 mt-16 rounded-lg"  onClick={handleNewPlaylistClick}>+ Nova Playlist</h3>
            </div>
            
            <div className="px-64 mt-4 w-full grid grid-cols-2">
                {playlists.map((play, index) => (

                    <div key={index} className="mb-12 px-4 justify-center text-center">                        

                        <div className="justify-center text-center flex bg-dark-blue p-4 rounded-t-lg">
                            <MdSettings size={20} color="White" onClick={() => editPlayList(play)}/>
                            <h3 className="text-ligth-white w-full mr-6">{play.name}</h3>
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
                                        {play.midias.map((midia, midiaIndex) => (
                                            // <h3 key={midiaIndex} className="text-black bg-flash-white py-4 my-4 rounded-lg">{midia.file_name}</h3>
                                            <div key={midiaIndex} className="w-full flex justify-center text-center my-6">
                                                {midia.file_name.split('.')[1] === 'mp4' ? 
                                                    <video className="max-h-60" controls><source src={`https://pi4.fly.storage.tigris.dev/${midia.file_name}`} type="video/mp4"/></video> : 
                                                    <img className="max-h-60" src={`https://pi4.fly.storage.tigris.dev/${midia.file_name}`} alt="logo"/>
                                                }
                                            </div>
                                        ))}
                                </Carousel>
                                {/* {play.midias.map((midia, midiaIndex) => (
                                    <h3 key={midiaIndex} className="text-black bg-flash-white py-4 my-4 rounded-lg">{midia.file_name}</h3>
                                ))} */}
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