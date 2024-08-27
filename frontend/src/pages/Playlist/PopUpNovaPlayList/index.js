import React from "react";
import Popup from "reactjs-popup";

export default function PopUpNovaPlaylist({ setShowPopUp }) {
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
                        <h2 className="text-ligth-white font-bold text-xl p-4 bg-dark-purple rounded-t-lg">CADASTRAR PLAYLIST</h2>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="m-12">
                            <label className="block text-black mb-2">Nome da Playlist:</label>
                            <input type="text" className="w-full px-3 py-2 border rounded-lg" required />
                        </div>

                        <div className="absolute justify-center bottom-0 w-full mb-8">
                            <button type="button" className="right-10 w-36 absolute px-4 py-2 bg-red-500 text-white rounded-lg" onClick={closeModal}>
                                Cancelar
                            </button>
                            <button type="submit" className="ml-10 w-36 px-4 py-2 bg-blue-500 text-white rounded-lg">
                                Salvar
                            </button>
                        </div>

                    </form>

                </div>
            </Popup>
        </div>
    );
}
