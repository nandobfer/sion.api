import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body

    const user = await prisma.users.findFirst({
        where: {
            OR: [{ username: data.user }, { email: data.user }],
            AND: {
                password: data.password,
            },
        },
    })

    response.json(user)
})

export default router
