import React from "react";
import SideBar from "../../components/SideBar";

export default function Playlist(){

    return (
        <div className="w-full">
            <SideBar
                title={'PLAYLIST'}
            />

            <div className="mx-64 mt-12 space-y-8 justify-center text-center">
                <div className="justify-center text-center flex">
                    <h3 className="text-black bg-green-300 p-4 w-60 rounded-lg">Nova Playlist</h3>
                </div>

                <div className="w-full flex">
                    <div className="w-2/4 h-70 bg-cards py-2 px-10 rounded-lg mx-8">
                            <h3 className="text-black bg-flash-white py-4 px-28 my-4 rounded-lg">Midia 1</h3>
                            <h3 className="text-black bg-flash-white py-4 px-28 my-4 rounded-lg">Midia 2</h3>
                            <h3 className="text-black bg-flash-white py-4 px-28 my-4 rounded-lg">Midia 3</h3>
                    </div>
                    <div className="w-2/4 h-70 bg-cards py-2 px-10 rounded-lg mx-8">
                            <h3 className="text-black bg-flash-white py-4 px-28 my-4 rounded-lg">Midia 1</h3>
                            <h3 className="text-black bg-flash-white py-4 px-28 my-4 rounded-lg">Midia 2</h3>
                            <h3 className="text-black bg-flash-white py-4 px-28 my-4 rounded-lg">Midia 3</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}