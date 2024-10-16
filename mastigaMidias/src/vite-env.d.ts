/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL
    readonly VITE_MQTT_URL
    readonly VITE_MQTT_USER
    readonly VITE_MQTT_PASSWORD
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
