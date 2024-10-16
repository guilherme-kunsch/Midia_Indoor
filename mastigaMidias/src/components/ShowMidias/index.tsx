import { Midia } from "../../types/playlist";
import { Cache } from "../../types/cache";
import TextView from "../TextView";
interface MidiaRenderProps {
    midia: Midia
    cachedUrls: Cache
}

const MidiaRenderer = ({ midia, cachedUrls }: MidiaRenderProps) => {
  if(!cachedUrls || !midia) return null
  const cached = cachedUrls[midia.file_url];
  if (!cached) return null;

  switch (midia.file_type) {
    case "image":
        return (
            <div key={midia.id} className="w-full h-full flex justify-center items-center">
                <img src={cached} alt="" className="object-contain w-full h-full" />
            </div>
        );
    case "video":
        return (
            <div key={midia.id} className="w-full h-full flex justify-center items-center">
                <video
                    src={cached}
                    className="w-full h-full object-contain"
                    autoPlay
                    muted
                    playsInline
                />
            </div>
        );
    case "text":
        return (
            <div key={midia.id} className="w-full h-full flex justify-center items-center">
                <TextView content={cached} className="text-center text-white text-3xl" />
            </div>
        );
    default:
        return null;
}
};

export default MidiaRenderer;
