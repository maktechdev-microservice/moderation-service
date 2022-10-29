import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())


const port = 4003


app.post("/events", (req, res) => {
    console.log(`get ${req.body}`)
    res.send({
    
    })
})


app.listen(port, () => console.log(`Moderator service is listening at ${port}`))