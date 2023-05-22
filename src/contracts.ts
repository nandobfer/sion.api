import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (request: Request, response: Response) => {
    const contracts = await prisma.contracts.findMany({ include: { seller: true } })
    response.json(contracts)
})

export default router
