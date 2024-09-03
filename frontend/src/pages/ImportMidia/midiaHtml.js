import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";

export default function MidiaHtml() {
  const [htmlContent, setHtmlContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const enviarImagem = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append("file", file);

      // Pré-visualização da imagem ou mídia em HTML
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      await fetch("https://mastigadores.fly.dev/midia/upload", {
        method: "POST",
        body: formData,
      });

      alert("Mídia salva com sucesso!");
      navigate("/Gerenciamento");
    } catch (error) {
      alert(
        "Erro ao realizar upload da Mídia, se persiste contate os Mastigadores"
      );
      console.error("Erro: " + error.message);
    }
  };

  const enviarHtml = async () => {
    try {
      const formData = new FormData();
      formData.append("htmlContent", htmlContent);

      await fetch("https://mastigadores.fly.dev/midia/uploadHtml", {
        method: "POST",
        body: formData,
      });

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

      <div className="w-full justify-center text-center flex">
        <label
          htmlFor="file-input"
          className="relative w-96 h-64 bg-white rounded-lg flex items-center justify-center cursor-pointer my-8"
        >
          <input
            type="file"
            id="file-input"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={enviarImagem}
          />
        </label>
      </div>

      {imagePreview && (
        <div className="w-full justify-center text-center flex">
          <img
            src={imagePreview}
            alt="Pré-visualização"
            className="w-1/2 h-64 object-cover my-8"
          />
        </div>
      )}

      <div className="w-full h-1/2 flex flex-col items-center">
        <div className="w-full h-1/2 p-2 flex justify-center">
          <textarea
            className="w-1/2 h-full bg-white border-2 border-gray-400 rounded-lg p-4"
            placeholder="Cole ou digite o código HTML aqui..."
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
          ></textarea>
        </div>

        {htmlContent && (
          <div className="w-full h-1/2 p-2 flex justify-center">
            <div
              className="w-1/2 h-full bg-gray-100 border-2 border-gray-400 rounded-lg p-4 overflow-auto"
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
