import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import control from "../../assets/control.png";
import LogoUcl from "../../assets/LogoUCL.png";

import { FaRegListAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

export default function SideBar({ title }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const alterStatusSideBar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">
      <div
        className={`${
          open ? "w-72" : "w-20 "
        } h-screen bg-dark-purple top-0 z-50 fixed justify-center text-center duration-300 shadow-md shadow-dark-purple`}
      >
        <img
          src={control}
          alt="control"
          className={`absolute cursor-pointer -right-3 top-12 w-7 border-dark-purple
                            border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => alterStatusSideBar()}
        />
        <div className="flex gap-x-4 items-center text-center justify-center my-5">
          <img
            src={LogoUcl}
            alt="Logo UCL"
            onClick={() => navigate("/")}
            width={open ? 100 : 50}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-6">
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 mx-5"
            onClick={() => navigate("/Playlist")}
          >
            <FaRegListAlt size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Playlist
            </span>
          </li>
        </ul>

        <ul className="pt-6">
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 mx-5"
            onClick={() => navigate("/Gerenciamento")}
          >
            <MdSettings size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Gerenciamento
            </span>
          </li>
        </ul>

        <ul className="pt-6">
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 mx-5"
            onClick={() => navigate("/GerenciarSenhas")}
          >
            <FaLock size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Gerenciar Senhas
            </span>
          </li>
        </ul>

        <ul className="pt-6">
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 mx-5"
            onClick={() => navigate("/Dispositivos")}
          >
            <MdDevices size={20} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Dispositivos
            </span>
          </li>
        </ul>
      </div>

      <div className="w-full z-40 fixed top-0 justify-center items-center bg-dark-purple text-white py-4 px-6 shadow shadow-dark-blue">
        <div className="flex justify-center text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
}
