import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { join } from "path"
import fs from "fs"

const router = express.Router()
const prisma = new PrismaClient()

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

    const filePath = join(static_dir, `${data.name}.${extension}`)

    file.mv(filePath, (err: any) => {
        if (err) {
            console.error("Error saving file:", err)
            return response.status(500).json({ error: "Error saving file" })
        }
    })

    response.json(`${data.name}.${extension}`)
})

export default router
