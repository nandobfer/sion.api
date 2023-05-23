import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (request: Request, response: Response) => {
    const users = await prisma.users.findMany({ include: { contracts: true } })
    response.json(users)
})

router.post("/update", async (request: Request, response: Response) => {
    const data = request.body

    const user = await prisma.users.update({
        data: { name: data.name, phone: data.phone },
        where: { id: data.id },
    })

    response.json(user)
})

router.post("/password", async (request: Request, response: Response) => {
    const data = request.body

    const user = await prisma.users.update({
        data: { password: data.password },
        where: { id: data.id },
    })

    response.json(user)
})

router.post("/email", async (request: Request, response: Response) => {
    const data = request.body

    const user = await prisma.users.update({
        data: { email: data.email },
        where: { id: data.id },
    })

    response.json(user)
})

export default router
