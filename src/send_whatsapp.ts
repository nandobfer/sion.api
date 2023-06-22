import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { whatsapp } from "./whatsapp"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/token", async (request: Request, response: Response) => {
    const data = request.body
    let number = `55${data.number}@c.us`

    const registered = await whatsapp.isRegisteredUser(number)

    if (!registered) {
        const prefix = number.slice(2, 4)
        number = prefix + number.slice(5)
        console.log(`55${data.number}@c.us is not registered, trying ${number}`)
    }

    const message = await whatsapp.sendMessage(number, `Token: ${data.token}`)
    console.log(message)
    response.json(message.body)
})

export default router
