import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../components/SideBar';
import api from '../../api/api';
export default function MidiaHtml() {
  const editorRef = useRef(null);
  const [contentName, setContentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const saveHtml = async () => {
    if (!contentName.trim()) {
      setErrorMessage('O nome do conteúdo não pode ser vazio');
      return;
    }
    if (editorRef.current) {
      const html = editorRef.current.getContent();
      const blob = new Blob([html], { type: 'text/html' })
      const formData = new FormData()
      formData.append('file', blob, contentName + ".html")
      try {
        const response = await api.post('/midia/upload', formData);
        if (!response.ok) {
          throw new Error('Erro ao enviar o arquivo');
        }
        toast.success('Conteudo salvo com sucesso');
        navigate("/Gerenciamento")
      } catch (error) {
        console.error('Erro ao salvar o arquivo:', error);

      setErrorMessage('');
      }
    }
  };

  return (
    <>
    <SideBar title="IMPORTAR HTML"/>
    <div className="flex items-center justify-center h-screen bg-white mt-20">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />
      <form className="w-full max-w-xl p-8 bg-gray-100 shadow-lg rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Digite um nome para o conteúdo"
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          {errorMessage && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
        <div className="mb-4">
          <Editor
            apiKey="1hcpikelxgwpoyqhur6t63izha34o3jqn6286flhjhz78x5q"
            onInit={(_, editor) => editorRef.current = editor}
            init={{
              language: "pt_BR",
              contextmenu: false,
              height: 500,
              images_upload_url: `https://mastigadores.fly.dev/midia/upload/html`,
              menubar: true,
              plugins:
              "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
              font_family_formats:
              "Barlow,Inter,sans-serif; New Frank=new-frank,sans-serif",
              font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
              toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              content_css: false
            }}
            />
        </div>
        <div className="flex justify-center">
          <button
            onClick={saveHtml}
            type="button"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
            </>
  );
}
