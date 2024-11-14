
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import PopUpImage from "./PopUpImage";
import TextView from "../../components/TextView";
import { TiDelete } from "react-icons/ti";
import api from "../../api/api";

export default function Gerenciamento() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [midias, setMidias] = useState([]);
  const [duracoes, setDuracoes] = useState({});
  const navigate = useNavigate();

  const handleImagemClick = (img) => {
    setImagem(img);
    setShowPopUp(true);
  };

  const handleDurationChange = (id, value) => {
    const durationInMs = value * 1000;
    setDuracoes((prev) => ({ ...prev, [id]: durationInMs }));
    saveDuration(id, durationInMs);
  };

  const saveDuration = async (id, duration) => {
    try {
      await api.put(`/midia/${id}/duracao`, { duration }); // faz o envio da duração para a API 
    } catch (error) {
      console.error("Erro ao salvar duração:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja remover essa mídia?");
    if (!confirm) return;

    const response = await api.delete(`/midia/${id}`);
    if (response.status === 200) window.location.reload();
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/midia");
      if (response && response.data) {
        setMidias(response.data);


        const initialDurations = response.data.reduce((acc, midia) => {
          acc[midia.id] = midia.duration || 5000;
          return acc;
        }, {});
        setDuracoes(initialDurations);
      } else {
        console.error("Erro: 'data' está ausente na resposta da API.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <SideBar title={"GERENCIAMENTO"} />
      <div className="flex justify-end">
        <div className="justify-end m-4 text-center flex">
          <h3
            className="text-black text-sm bg-green-300 p-2 w-40 cursor-pointer mt-16 rounded-lg"
            onClick={() => navigate("/ImportarMidias")}
          >
            + Nova Mídia
          </h3>
        </div>

        <div className="justify-end m-4 text-center flex">
          <button
            className="text-black text-sm bg-green-300 p-2 w-40 cursor-pointer mt-16 rounded-lg"
            onClick={() => navigate("/ImportarMidiasHtml")}
          >
            + Nova Mídia HTML
          </button>
        </div>
      </div>

      <div className="pl-40 w-full grid grid-cols-2">
        {midias.map((midia, index) => (
          <div key={index} className="w-9/12 h-70 mb-9 bg-gray-200 rounded-lg">
            <div className="justify-center text-center flex bg-dark-blue p-4 rounded-t-lg">
              <TiDelete
                size={22}
                color="Red"
                className="cursor-pointer"
                onClick={() => handleDelete(midia.id)}
              />
              <h1 className="text-white w-full mr-6">{midia.file_original_name}</h1>
            </div>

            <div className="h-60 justify-center flex text-center m-auto items-center">
              {midia.file_type === "image" ? (
                <img
                  className="max-h-60"
                  src={midia.file_url}
                  alt="logo"
                  onClick={() => handleImagemClick(midia.file_url)}
                />
              ) : midia.file_type === "video" ? (
                <video className="max-h-60" controls autoPlay>
                  <source src={midia.file_url} type="video/mp4" />
                </video>
              ) : (
                <div className="max-h-60 text-black">
                  <TextView id={midia.id} />
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <label className="mr-2 text-slate-900">Duração (s):</label>
              <input
                type="number"
                min="1"
                value={duracoes[midia.id] / 1000 || 1}
                onChange={(e) => handleDurationChange(midia.id, e.target.value)}
                className="w-16 border mb-3 border-slate-900 rounded-md text-center"
              />
            </div>
          </div>
        ))}
      </div>

      {showPopUp && <PopUpImage setShowPopUp={setShowPopUp} img={imagem} />}
    </div>
  );
}
