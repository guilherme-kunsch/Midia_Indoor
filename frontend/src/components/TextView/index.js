import { useEffect, useState } from "react";

export default function TextView({id}) {
  const [textContent, setTextContent] = useState(0)
  useEffect(() => {
    const fetchText = async () => {
      const response = await fetch("https://mastigadores.fly.dev/html/" + id)
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text()
      setTextContent(text);
    }
    fetchText()
  }, [id])
  return (
    <div className="text-viewer">
      <div dangerouslySetInnerHTML={{__html: textContent}}></div>
    </div>
  )
}