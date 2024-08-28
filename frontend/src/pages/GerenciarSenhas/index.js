import React, { useState } from "react";
import SideBar from "../../components/SideBar";

export default function GerenciarSenhas() {
  const [previousPassword, setPreviuosPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [nextPassword, setNextPassword] = useState();

  return (
    <div className="w-full">
      <SideBar title={"GERENCIAR SENHAS"} />

      <div className="mx-80 mt-24 space-y-8 justify-center text-center">
        <div className="w-full h-70 bg-gray-200 py-8 px-20 rounded-lg">
          <h1 className="text-black mb-4">Senha Normal</h1>
          <div className="grid grid-cols-3 gap-8 mb-8 border">
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Anterior</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-6 rounded-lg">
                {previousPassword}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Senha Atual</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-6 rounded-lg">
                {showPassword}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black font-bold">Próxima Senha</p>
              <h3 className="text-black font-bo text-center w-full bg-gray-300 p-6 rounded-lg">
                {nextPassword}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
