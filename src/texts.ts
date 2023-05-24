import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (request: Request, response: Response) => {
    const texts = await prisma.texts.findMany({ include: { user: true } })
    response.json(texts)
})

router.post("/update", async (request: Request, response: Response) => {
    const data = request.body

    const text = await prisma.texts.update({
        where: { id: data.id },
        data: {
            text: data.text,
            user_id: data.user.id,
            date: data.date,
        },
        include: { user: true },
    })

    response.json(text)
})

export default router
