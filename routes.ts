import express from "express"
import login from "./src/login"
import contract from "./src/contract"
import signup from "./src/signup"
import viacep from "./src/viacep"

export const router = express.Router()

router.use("/login", login)
router.use("/contract", contract)
// router.use("/signup", signup)

router.post("/cep", (request, response, next) => {
    const data = request.body

    viacep.search(data.cep.replace(/\D/g, ""), (address: any) => {
        response.json(address)
    })
})
