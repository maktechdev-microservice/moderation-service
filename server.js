import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())


const port = 4003


app.post("/events", async (req, res) => {
    console.log(`get ${req.body}`)
    const { type, data: { id, content, postId } } = req.body
    setTimeout( async () => {
        if (type==="CommentCreated") {
        const status = (content.includes('wtf')) ? "rejected" : "approved"
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                id, content, postId, status
            }
        }).catch(err => {
            console.log(`moderator reports ${err}`)
        })
    }
    }, 25000);
    
    res.send({})
})


app.listen(port, async () => {
    console.log(`Moderator service is listening at ${port}`)
    const resp = await axios.get('http://localhost:4005/events').catch(err => console.log(`text ${err}`))
    console.log(`<data:></data:> ${resp.data}`)
})