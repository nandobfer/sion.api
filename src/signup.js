import { Router } from "express"
const router = Router()

// router.post("/", (request, response, next) => {
//     const data = request.body

//     const mysql = newMysql(sion.database)
//     mysql.connect()

//     if (data.news_signup) {
//         mysql.query(
//             {
//                 sql: "INSERT INTO emails (email) VALUES (?)",
//                 values: [data.email],
//             },
//             (error, results) => {
//                 if (error) console.error(error)

//                 response.json(results)
//                 mysql.end()
//             }
//         )
//     }
// })

export default router
