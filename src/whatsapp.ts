import qrcode from "qrcode-terminal"
import { Client, LocalAuth } from "whatsapp-web.js"

export const whatsapp = new Client({
    authStrategy: new LocalAuth({ dataPath: "whatsapp.auth" }),
})

whatsapp.on("qr", (qr) => {
    qrcode.generate(qr, { small: true })
})

whatsapp.on("ready", () => {
    console.log("whatsapp client is ready")
})
