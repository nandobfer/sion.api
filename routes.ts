import express from "express"
import login from "./src/login"
import contract from "./src/contract"
import signup from "./src/signup"
import viacep from "./src/viacep"
import contracts from "./src/contracts"
import user from "./src/user"
import settings from "./src/settings"
import texts from "./src/texts"

export const router = express.Router()

router.use("/login", login)
router.use("/user", user)
router.use("/contract", contract)
router.use("/contracts", contracts)
router.use("/settings", settings)
router.use("/texts", texts)
// router.use("/signup", signup)

router.post("/cep", (request, response, next) => {
    const data = request.body

    viacep.search(data.cep.replace(/\D/g, ""), (address: any) => {
        response.json(address)
    })
})
