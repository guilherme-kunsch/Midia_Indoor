import React from "react";
import SideBar from '../../components/SideBar'
import { useNavigate } from "react-router-dom";


export default function Midia(){

  const navigate = useNavigate();

  const enviarImagem = async (e) => {

    try{

      const file = e.target.files[0]
      const formData = new FormData()
      
      formData.append('file', file)
      
      await fetch("https://mastigadores.fly.dev/midia/upload", {
        method: 'POST',
        body: formData,
      })

      alert("Mídia salva com sucesso!")
      navigate('/Gerenciamento')
      
    }catch(error){
      alert("Erro ao realizar upload da Mídia, se persiste contate os Mastigadores")
      console.error("Erro: " + error.message)
    }
  }

  return(
    <div className="w-full">   

      <SideBar
          title={'IMPORTAR MÍDIAS'}
      />

      <div className="w-full justify-center text-center flex">
        <label htmlFor="file-input" className="relative w-96 h-64 bg-white rounded-lg flex items-center justify-center cursor-pointer my-32">
          <div className="absolute inset-0 m-3 p-4 border-dashed border-2 border-gray-400 rounded-md flex items-center justify-center bg-white active:bg-blue-900">
            <p className="text-center font-semibold">Selecione um arquivo ou solte aqui.</p>
          </div>
          <input type="file" id="file-input" className="absolute inset-0 opacity-0 cursor-pointer" onChange={enviarImagem}/>
        </label>
      </div>
    </div>
)
}