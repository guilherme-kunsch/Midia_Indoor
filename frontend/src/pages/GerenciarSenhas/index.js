import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import mqtt from 'mqtt'

const MQTT_URL = import.meta.env.VITE_MQTT_URL;
const MQTT_USER = import.meta.env.VITE_MQTT_USER;
const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;

export default function GerenciarSenhas() {
  const [numSenhasNormais, setNumSenhasNormais] = useState(1); 
  const [numSenhasPreferenciais, setNumSenhasPreferenciais] = useState(1); 
  const [indexNormal, setIndexNormal] = useState(0); 
  const [indexPreferencial, setIndexPreferencial] = useState(0);

  useEffect(() => {
    // Conectar ao MQTT
    const client = mqtt.connect(MQTT_URL, {
      username: MQTT_USER,
      password: MQTT_PASSWORD
    });

    client.on("connect", () => {
      console.log("Conectado ao MQTT");
      // Inscrever-se nos tópicos de senha
      client.subscribe("senhas/normal");
      client.subscribe("senhas/preferencial");
    });

    client.on("message", (topic, message) => {
      const receivedValue = parseInt(message.toString(), 10);
      if (topic === "senhas/normal") {
        setIndexNormal(receivedValue);
      } else if (topic === "senhas/preferencial") {
        setIndexPreferencial(receivedValue);
      }
    });

    client.on("error", (error) => {
      console.error("Erro na conexão MQTT:", error);
    });

    return () => {
      client.end(() => console.log("Conexão MQTT encerrada"));
    };
  }, []);

  const handleNumSenhasNormaisChange = (e) => {
    const newNumSenhas = parseInt(e.target.value, 10);
    if (newNumSenhas > 0) {
      setNumSenhasNormais(newNumSenhas);
      setNumSenhasNormais(Array.from({ length: newNumSenhas }, (_, i) => `${i}`));
      setIndexNormal(0);
    }
  };

  const handleNumSenhasPreferenciaisChange = (e) => {
    const newNumSenhas = parseInt(e.target.value, 10);
    if (newNumSenhas > 0) {
      setNumSenhasPreferenciais(newNumSenhas);
      setNumSenhasPreferenciais(Array.from({ length: newNumSenhas }, (_, i) => `P${i}`));
      setIndexPreferencial(0);
    }
  };

  const handlePreviousPassword = (isPreferencial) => {
    if (isPreferencial) {
      if (indexPreferencial > 0) {
        setIndexPreferencial(indexPreferencial - 1);
      }
    } else {
      if (indexNormal > 0) {
        setIndexNormal(indexNormal - 1);
      }
    }
  };

  const handleNextPassword = (isPreferencial) => {
    if (isPreferencial) {
      if (indexPreferencial < numSenhasPreferenciais.length - 1) {
        setIndexPreferencial(indexPreferencial + 1);
      }
    } else {
      if (indexNormal < numSenhasNormais.length - 1) {
        setIndexNormal(indexNormal + 1);
      }
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
                {indexNormal > 0 ? numSenhasNormais[indexNormal - 1] : "N/A"}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {numSenhasNormais[indexNormal]}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Próxima Senha</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexNormal < numSenhasNormais.length - 1 ? numSenhasNormais[indexNormal + 1] : "N/A"}
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
          <h1 className="text-black mb-4 text-3xl font-bold">Senha Preferencial</h1>
          <div className="grid grid-cols-3 gap-8 mb-8 border">
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Anterior</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexPreferencial > 0 ? numSenhasPreferenciais[indexPreferencial - 1] : "N/A"}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {numSenhasPreferenciais[indexPreferencial]}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Próxima Senha</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-4 rounded-lg">
                {indexPreferencial < numSenhasPreferenciais.length - 1 ? numSenhasPreferenciais[indexPreferencial + 1] : "N/A"}
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

        {/* Configurar Senhas */}
        <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg mt-8">
          <h1 className="text-black mb-4 text-3xl font-bold">Configurar Senhas</h1>
          <div className="flex justify-center mb-8 space-x-8">
            <div className="flex flex-col items-center">
              <label className="text-black font-bold mb-2">Quantidade de Senhas Normais:</label>
              <input
                type="number"
                value={numSenhasNormais}
                onChange={handleNumSenhasNormaisChange}
                className="w-16 p-2 text-center border rounded"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-black font-bold mb-2">Quantidade de Senhas Preferenciais:</label>
              <input
                type="number"
                value={numSenhasPreferenciais}
                onChange={handleNumSenhasPreferenciaisChange}
                className="w-16 p-2 text-center border rounded"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
