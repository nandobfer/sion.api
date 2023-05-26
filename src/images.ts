import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { join } from "path"
import fs from "fs"

const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (request: Request, response: Response) => {
    const images = await prisma.images.findMany({ include: { user: true } })
    response.json(images)
})

router.post("/update", async (request: any, response: Response) => {
    const data = JSON.parse(request.body.data)
    const file = request.files.file

    const extension = file.name.split(".")[file.name.split(".").length - 1]

    const static_dir = join(process.cwd(), "static")

    const files = fs.readdirSync(static_dir)
    files.map((filename) => {
        if (filename.split(".")[0] == data.name) {
            fs.unlinkSync(join(static_dir, filename))
        }
    })

    const new_filename = `${data.name}.${extension}`
    const filePath = join(static_dir, new_filename)

    file.mv(filePath, (err: any) => {
        if (err) {
            console.error("Error saving file:", err)
            return response.status(500).json({ error: "Error saving file" })
        }
    })

    const image = await prisma.images.update({
        where: { id: data.id },
        data: { src: new_filename, user_id: data.user.id, date: data.date },
        include: { user: true },
    })

    response.json(image)
})

export default router
