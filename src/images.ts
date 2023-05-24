import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: any, response: Response) => {
    const data = JSON.parse(request.body.data)
    const files = request.files

    console.log(data)
    console.log(files)

    // file.mv(filePath, (err) => {
    //     if (err) {
    //         console.error("Error saving file:", err)
    //         return res.status(500).json({ error: "Error saving file" })
    //     }
    // })

    // Object.entries(files).forEach(([key, file]) => {
    //     const filePath = join(uploadsDir, file.name)
    //     console.log(filePath)

    // })
})

export default router
