import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (request: Request, response: Response) => {
    const contracts = await prisma.contracts.findMany({ include: { seller: true } })
    response.json(contracts)
})

router.post("/id", async (request: Request, response: Response) => {
    const data = request.body
    const contract = await prisma.contracts.findUnique({ where: { id: Number(data.id) }, include: { seller: true } })

    response.json(contract)
})

router.post("/seller", async (request: Request, response: Response) => {
    const data = request.body
    const contracts = await prisma.contracts.findMany({ where: { seller_id: Number(data.id) }, include: { seller: true } })

    response.json(contracts)
})

export default router
