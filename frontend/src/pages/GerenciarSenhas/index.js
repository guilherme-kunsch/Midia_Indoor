import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";

export default function GerenciarSenhas() {
  const [senhasNormais, setSenhasNormais] = useState([]);
  const [senhasPreferenciais, setSenhasPreferenciais] = useState([]);
  const [indexNormal, setIndexNormal] = useState(0);
  const [indexPreferencial, setIndexPreferencial] = useState(0);

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await fetch("https://mastigadores-api.onrender.com/password");
        const data = await response.json();
        setSenhasNormais(data.senhasNormais || []);
        setSenhasPreferenciais(data.senhasPreferenciais || []);
      } catch (error) {
        console.error("Erro ao buscar senhas:", error);
      }
    };

    fetchSenhas();
  }, []);

  const handlePreviousPassword = (isPreferencial) => {
    if (isPreferencial) {
      if (indexPreferencial > 0) setIndexPreferencial(indexPreferencial - 1);
    } else {
      if (indexNormal > 0) setIndexNormal(indexNormal - 1);
    }
  };

  const handleNextPassword = (isPreferencial) => {
    if (isPreferencial) {
      if (indexPreferencial < senhasPreferenciais.length - 1)
        setIndexPreferencial(indexPreferencial + 1);
    } else {
      if (indexNormal < senhasNormais.length - 1)
        setIndexNormal(indexNormal + 1);
    }
  };

  const handleResetPassword = () => {
    setIndexNormal(0);
    setIndexPreferencial(0);
  };

  return (
    <div className="w-full">
      <SideBar title={"GERENCIAR SENHAS"} />

      <div className="mx-80 mt-24 space-y-8 justify-center text-center">
        {/* Senha Normal */}
        <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
          <h1 className="text-black mb-4 text-3xl font-bold">Senha Normal</h1>
          <div className="grid grid-cols-3 gap-8 mb-8 border">
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Anterior</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexNormal > 0 ? senhasNormais[indexNormal - 1] : "N/A"}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {senhasNormais[indexNormal] || "N/A"}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Próxima Senha</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexNormal < senhasNormais.length - 1
                  ? senhasNormais[indexNormal + 1]
                  : "N/A"}
              </h3>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => handlePreviousPassword(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Senha Anterior
            </button>
            <button
              onClick={() => handleNextPassword(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Próxima Senha
            </button>
            <button
              onClick={handleResetPassword}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Resetar Senhas
            </button>
          </div>
        </div>

        {/* Senha Preferencial */}
        <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
          <h1 className="text-black mb-4 text-3xl font-bold">
            Senha Preferencial
          </h1>
          <div className="grid grid-cols-3 gap-8 mb-8 border">
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Anterior</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexPreferencial > 0
                  ? senhasPreferenciais[indexPreferencial - 1]
                  : "N/A"}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {senhasPreferenciais[indexPreferencial] || "N/A"}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Próxima Senha</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexPreferencial < senhasPreferenciais.length - 1
                  ? senhasPreferenciais[indexPreferencial + 1]
                  : "N/A"}
              </h3>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => handlePreviousPassword(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Senha Anterior
            </button>
            <button
              onClick={() => handleNextPassword(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Próxima Senha
            </button>
            <button
              onClick={handleResetPassword}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Resetar Senhas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
