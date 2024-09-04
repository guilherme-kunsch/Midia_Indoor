import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import PopUpNewDisp from "./PopUpNewDisp";

export default function Dispositivos() {

  const [showPopUp, setShowPopUp] = useState(false);

  const [ dispositivos, setDispositivos ] = useState([]);
  const [ playlists, setPlaylists ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mastigadores.fly.dev/device", {
          method: "GET",
        });

        const data = await response.json();

        const dataAtu = await Promise.all(
          data.map(async (disp) => {
            const response = await fetch(`https://mastigadores.fly.dev/playlist/${disp.playlist_id}`, {
              method: "GET",
            });
            const playlist = await response.json();
        
            return { ...disp, playlist_name: playlist.name };
          })
        );

        setDispositivos(dataAtu);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();

  }, []);

  const adicionarDispositivo = () => {
    setShowPopUp(true)
  };

  const removerDispositivo = async (disp) => {
    try {

      const confirm = window.confirm("Tem certeza que deseja remover?")

      if(!confirm){
        return;
      }
      
      await fetch(`https://mastigadores.fly.dev/device/${disp.id}`, {
        method: "DELETE",
      });

      alert("Dispositivo removido com sucesso.")

      window.location.reload()

    } catch (error) {
      
    }
  };

  const gerenciarPlaylist = (dispositivo) => {
    alert(`Gerenciar playlist de ${dispositivo}`);
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
          {dispositivos.map((dispositivo, index) => (
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
                  onClick={() => gerenciarPlaylist(dispositivo)}
                  className="text-black bg-green-300 py-2 px-4 rounded-lg"
                >
                  Salvar
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

        {showPopUp && (
          <PopUpNewDisp
          setShowPopUp={setShowPopUp}
          />
        )}
      </div>
    </div>
  );
}
