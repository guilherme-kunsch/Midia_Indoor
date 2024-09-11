import React from 'react';
import logo from '../../assets/fundoFaculdade.jpg'
import SideBar from '../../components/SideBar';

export default function Home() {

    return (
        <div className="w-full h-screen">
            <SideBar
                title={'HOME'}
            />

            <div
                className="text-center bg-cover bg-center flex flex-col items-center justify-center h-full"
                style={{ backgroundImage: `url(${logo})`, height: '100vh' }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded-md shadow-lg">
                    <h1 className='text-white text-4xl font-bold'>MASTIGADORES</h1>
                    <h1 className='text-white text-4xl font-bold'>UCL 2024</h1>
                </div>
            </div>

        </div>
    )
}
