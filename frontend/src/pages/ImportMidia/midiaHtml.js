import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";

export default function MidiaHtml() {
  const [htmlContent, setHtmlContent] = useState("");
  const navigate = useNavigate();

  const enviarHtml = async () => {
    try {
      const formData = new FormData();
      formData.append("htmlContent", htmlContent);

      await fetch("https://mastigadores.fly.dev/midia/uploadHtml", {
        method: "POST",
        body: formData,
      });
      console.log(formData);

      alert("Mídia HTML salva com sucesso!");
      navigate("/Gerenciamento");
    } catch (error) {
      alert(
        "Erro ao realizar upload da Mídia HTML, se persiste contate os Mastigadores"
      );
      console.error("Erro: " + error.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <SideBar title={"IMPORTAR MÍDIAS EM HTML"} />

      <div className="w-full h-3/4 mt-24 flex flex-col items-center">
        <div className="w-full h-1/2 p-2 flex justify-center">
          <textarea
            className="w-[100rem] h-full bg-white border-2 border-gray-400 rounded-lg p-4"
            placeholder="Cole ou digite o código HTML aqui..."
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
          ></textarea>
        </div>

        {htmlContent && (
          <div className="w-full h-1/2 p-2 flex justify-center">
            <div
              className="w-[100rem] h-full bg-gray-100 border-2 border-gray-400 rounded-lg p-4 overflow-auto"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        )}
      </div>

      <div className="w-full justify-center text-center flex">
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={enviarHtml}
        >
          Enviar HTML
        </button>
      </div>
    </div>
  );
}
