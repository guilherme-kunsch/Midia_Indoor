import { useEffect, useState, } from "react"
import { useParams } from "react-router-dom"

export default function PlayContent() {
  const { deviceId } = useParams("deviceId")
  const [midias, setMidias] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const getMidias = async (id) => {
    const res = await fetch("https://mastigadores.fly.dev/play/" + id)
    if (res.status === 200) setMidias(await res.json())
    if (res.status !== 200) console.log(await res.json())
  }

  useEffect(() => {
    getMidias(deviceId)
  }, [deviceId])

  useEffect(() => {
    if (midias.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % midias.length)
      }, 5000)

      return () => clearInterval(interval) // Clear the interval when the component unmounts
    }
  }, [midias])

  return (
    <> 
      {midias.length > 0 && (
        <img
          style={{ width: "100%", height: "100%" }}
          key={midias[currentIndex].id}
          src={midias[currentIndex].file_url}
          alt={`Media ${midias[currentIndex].id}`}
        />
      )}
    </>
  )
}
