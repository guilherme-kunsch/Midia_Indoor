import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select"
import { Device } from "../../types/device"
import API from "../../lib/api"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
export const SelectDevice = () => {
    const navigate = useNavigate()
    const [devices, setDevices] = useState<Device[]>()
    const [selectedDevice, setselectedDevice] = useState("")
    const fetchDevices = async () => {
        return new API().get("/device").then((response) => {
            if (response.status != 200) return Promise.reject(response)
            setDevices(response.data)
        })
    }
    const handleClick = (device: string) => {
        const [playlistId, deviceId] = device.split(",")
        const path = `/${playlistId}?device=${deviceId}`
        navigate(path)
    }
    useEffect(() => {
        fetchDevices()
    }, [])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Dispotivos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={(e) => setselectedDevice(e)}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Selecione o dispositivo" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="n">Nenhum</SelectItem>
                            {devices && devices.map((device: Device) => (
                                device.playlist_id && (<SelectItem key={device.id} value={`${device.playlist_id},${device.id}`}>{device.name}</SelectItem>)
                            ))}
                        </SelectContent>
                    </Select>
                    <Button disabled={selectedDevice == "n"} type="button" className="bg-green-300 w-full mt-6" onClick={() => handleClick(selectedDevice)}>Confirmar</Button>
                </CardContent>
            </Card>
        </div>
    )
}
