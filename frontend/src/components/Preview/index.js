import TextView from "../TextView"

export default function Preview({ midia, closePreviewModal }) {
    return (
        <div className="fixed inset-0 flex bg-black/60 items-center justify-center">
            <div className="flex justify-center w-[340px] rounded-xl py-5 px-6 bg-white space-y-5 text-black">
                <div className="space-y-2">
                        <button onClick={closePreviewModal} className="text-red-500">Fechar</button>
                        {midia && midia.file_type === "image" && (
                            <img src={midia.file_url} alt={midia.file_original_name} className="max-w-full h-auto" />
                        )}
                        {midia && midia.file_type === "video" && (
                            <video src={midia.file_url} controls className="max-w-full h-auto" />
                        )}
                        {midia && midia.file_type === "text" && (
                            <div className="max-w-full h-auto"> <TextView id={midia.id}/> </div>
                        )}
                </div>
            </div>

        </div>
    )
}
