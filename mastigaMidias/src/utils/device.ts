import API from "../lib/api";
import { Device } from "../types/device";


export const fetchDeviceFromAPI = async (deviceId: string): Promise<Device> => {
    return new API()
        .get("/device/" + deviceId)
        .then((response) => {
            if (response.status !== 200) throw new Error("Erro ao buscar dispositovo");
            return response.data as Device;
        });
};
