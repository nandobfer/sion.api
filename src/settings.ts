import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/rate", async (request: Request, response: Response) => {
    const data = request.body

    const rate = await prisma.settings.update({ data: { rate: Number(data.rate) }, where: { id: 1 } })
    response.json(rate)
})

export default router
