import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import api from "../../api/api";

export default function GerenciarSenhas() {

  const [senhaNormal, setSenhaNormal] = useState({});
  const [senhaPreferencial, setSenhaPreferencial] = useState({});
  const [senhaNormaisCriadas ,setSenhasNormaisCriadas] = useState([])
  const [senhaPreferenciasCriadas ,setSenhasPreferenciasCriadas] = useState([])
  const fetchSenhas = async () => {
    try {
      const normalPasswordResponse = await api.get("/password/atual?type=N")
      if(normalPasswordResponse.status === 200 ) {
          setSenhaNormal(normalPasswordResponse.data)
      }
      const preferencialPasswordResponse = await api.get("/password/atual?type=P")
      if(preferencialPasswordResponse.status === 200) {
          setSenhaPreferencial(preferencialPasswordResponse.data)
      }
    } catch (error) {
      console.error("Erro ao buscar senhas:", error);
    }
  };
  const fetchCreatedPassword = async () => {
    try {
        const normalPasswordResponse = await api.get("/password?type=N")
        if(normalPasswordResponse.status === 200 ) {
            setSenhasNormaisCriadas(normalPasswordResponse.data)
        }
        const preferencialPasswordResponse = await api.get("/password?type=P")
        if(preferencialPasswordResponse.status === 200) {
            setSenhasPreferenciasCriadas(preferencialPasswordResponse.data)
        }
      } catch (error) {
        console.error("Erro ao buscar senhas:", error);
      }
  }
  useEffect(() => {
    fetchSenhas();
    fetchCreatedPassword()
  }, []);

  const handlePreviousPassword = async (passwordType) => {
    const response = await api.post("/password?op=sub&type="+passwordType)
    if(response.status === 201) {
        if(passwordType === "N") {
            setSenhaNormal(response.data)
        } else {
            setSenhaPreferencial(response.data)
        }
    }
    fetchCreatedPassword()
  };

  const handleNextPassword = async (passwordType) => {
    const response = await api.post("/password?op=add&type="+passwordType)
    if(response.status === 201) {
        if(passwordType === "N") {
            setSenhaNormal(response.data)
        } else {
            setSenhaPreferencial(response.data)
        }
    }
    fetchCreatedPassword()
  };
  const handleResetPassword = async (passwordType) => {
    const response = await api.delete("/password/reset?type="+passwordType)
    if(response.status === 200) {
        if(passwordType === "N") {
            await fetchSenhas()
            await fetchCreatedPassword(passwordType)
        } else {
            await fetchSenhas()
            await fetchCreatedPassword(passwordType)
        }
    }
    fetchCreatedPassword()
  }
  return (
    <div className="w-full">
      <SideBar title={"GERENCIAR SENHAS"} />
  
      <div className="mx-80 my-24 space-y-8 justify-center text-center">
        <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
          <h1 className="text-black mb-4 text-3xl font-bold">Senha Normal</h1>
  
          <div className="grid flex border">
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bold text-center w-full bg-gray-300 p-4 rounded-lg">
                {senhaNormal.password ? senhaNormal.password : "Carregando"}
              </h3>
            </div>
  
            <div className="flex justify-between mt-8">
              <button
                onClick={() => handlePreviousPassword("N")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Senha Anterior
              </button>
              <button
                onClick={() => handleNextPassword("N")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Próxima Senha
              </button>
              <button
                onClick={() => handleResetPassword("N")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Resetar Senhas
              </button>
            </div>
          </div>
        </div>
  
        <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
          <h1 className="text-black mb-4 text-3xl font-bold">Senha Normal</h1>
  
          <div className="grid flex mb-4 border">
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bold text-center w-full bg-gray-300 p-4 rounded-lg">
                {senhaPreferencial.password ? senhaPreferencial.password : "Carregando"}
              </h3>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => handlePreviousPassword("P")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Senha Anterior
            </button>
            <button
              onClick={() => handleNextPassword("P")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Próxima Senha
            </button>
            <button
              onClick={() => handleResetPassword("P")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Resetar Senhas
            </button>
          </div>
        </div>
  
        <div className="w-full h-70 bg-gray-200 pt-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black">Senhas Criadas</h2>
          <div className="flex justify-between">
            <div className="w-1/2 p-4">
              <h3 className="text-xl font-semibold mb-2 text-black">Senhas Normais</h3>
              {senhaNormaisCriadas &&
                senhaNormaisCriadas.map((senhas) => (
                  <ul className="list-disc list-inside bg-gray-300 text-black font-bold p-4 rounded-lg" key={senhas.password}>
                    {senhas.password}
                  </ul>
                ))}
            </div>
            <div className="w-1/2 p-4">
              <h3 className="text-xl font-semibold mb-2 text-black">Senhas Preferenciais</h3>
              {senhaPreferenciasCriadas &&
                senhaPreferenciasCriadas.map((senhas) => (
                  <ul className="list-disc list-inside bg-gray-300 text-black font-bold p-4 mb-2 rounded-lg" key={senhas.password}>
                    {senhas.password}
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
