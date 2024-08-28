import React, { useState } from "react";
import SideBar from "../../components/SideBar";

export default function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([
    "Dispositivo1",
    "Dispositivo 2",
    "Dispositivo 3",
  ]);

  const adicionarDispositivo = () => {
    const novoDispositivo = prompt("Digite o nome do novo dispositivo");
    setDispositivos([...dispositivos, novoDispositivo]);
  };

  const removerDispositivo = (index) => {
    const novosDispositivos = dispositivos.filter((_, i) => i !== index);
    setDispositivos(novosDispositivos);
  };

  const gerenciarPlaylist = (dispositivo) => {
    alert(`Gerenciar playlist de ${dispositivo}`);
  };

  return (
    <div className="w-full">
      <SideBar title={"DISPOSITIVOS"} />

      <div className="mx-auto mt-12 pt-10 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-8">
          <button
            onClick={adicionarDispositivo}
            className="text-black bg-green-300 p-4  w-full sm:w-60 rounded-lg"
          >
            Novo Dispositivo
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dispositivos.map((dispositivo, index) => (
            <div
              key={index}
              className="bg-gray-200 p-6 rounded-lg flex flex-col items-center space-y-4"
            >
              <h3 className="text-black bg-gray-300 py-2 px-4 rounded-lg text-center">
                {dispositivo}
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => gerenciarPlaylist(dispositivo)}
                  className="text-black bg-green-300 py-2 px-4 rounded-lg"
                >
                  Playlist
                </button>
                <button
                  onClick={() => removerDispositivo(index)}
                  className="text-black bg-red-300 py-2 px-4 rounded-lg"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
