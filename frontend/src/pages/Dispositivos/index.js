import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import PopUpNewDisp from "./PopUpNewDisp";
import api from '../../api/api'
import EditDeviceModal from "./PopUpEditDisp";
export default function Dispositivos() {

  const [newDevideModal, setNewDeviceModal] = useState(false);
  const [device, setDevice] = useState(null)
  const [editDeviceModal, setEditDeviceModal] = useState(false)
  const [ dispositivos, setDispositivos ] = useState([]);

  const openEditDeviceModal = (device) => {
    setDevice(device)
    setEditDeviceModal(true)
  }
  const closeEditDeviceModal = () => {
    setEditDeviceModal(false)
    setDevice(null)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/device")
        if(response.status === 200) {
          const data = response.data;
          setDispositivos(data);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();

  }, []);

  const adicionarDispositivo = () => {
    setNewDeviceModal(true)
  };

  const removerDispositivo = async (disp) => {
    try {

      const confirm = window.confirm("Tem certeza que deseja remover?")

      if(!confirm){
        return;
      }
      
      const response = await api.delete(`/device/${disp.id}`);
      if(response.status === 200) {
        alert("Dispositivo removido com sucesso.")
        window.location.reload()
      } 
    } catch (error) {
      
    }
  };

  return (
    <div className="w-full">
      <SideBar title={"DISPOSITIVOS"} />

      <div className="mx-auto mt-12 pt-10 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-end mb-8">
          <button
            onClick={adicionarDispositivo}
            className="text-black bg-green-300 p-4  w-full sm:w-60 rounded-lg"
          >
            Novo Dispositivo
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dispositivos && dispositivos.map((dispositivo, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg flex flex-col items-center space-y-4"
            >

              <h3 className="text-white w-full bg-dark-blue py-2 px-4 rounded-t-lg text-center">
                {dispositivo.name}
              </h3>

              <label className="text-black">{dispositivo.playlist_name}</label>

              <div className="flex space-x-4 pb-4">
                <button
                  onClick={() => openEditDeviceModal(dispositivo)}
                  className="text-black bg-green-300 py-2 px-4 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => removerDispositivo(dispositivo)}
                  className="text-black bg-red-300 py-2 px-4 rounded-lg"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {newDevideModal && (
          <PopUpNewDisp
          setShowPopUp={setNewDeviceModal}
          />
        )}

        {editDeviceModal && <EditDeviceModal closeEditDeviceModal={closeEditDeviceModal} device={device}/>}
      </div>
    </div>
  );
}
