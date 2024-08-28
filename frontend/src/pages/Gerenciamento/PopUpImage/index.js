import React from "react";
import Popup from "reactjs-popup";

export default function PopUpImage({ setShowPopUp, img }) {
    const closeModal = () => {
        setShowPopUp(false);
    };

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black opacity-40"></div> {/* Fundo escuro semi-transparente */}

            <Popup open={true} onClose={closeModal} modal nested>
                <div className="h-full m-auto bg-white rounded-lg">
                    <img className="max-h-screen" src={img} alt="logo" />
                </div>
            </Popup>
        </div>
    );
}
