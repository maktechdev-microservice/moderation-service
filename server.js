import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const port = 4003;

app.post("/events", async (req, res) => {
  const {
    type,
    data: { id, content, postId },
  } = req.body;
  console.log(`received ${type}, ${content}, ${postId}`);
  if (type === "CommentCreated") {
    const status = content.includes("wtf") ? "rejected" : "approved";
    // posting the updated comment to event-bus
    await axios
      .post("http://events-clusterip-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          content,
          postId,
          status,
        },
      })
      .catch((err) => {
        console.log(`moderator reports ${err}`);
      });
  }


  res.send({})
});

app.listen(port, async () => {
  console.log(`Moderator service is listening at ${port}`);
  const resp = await axios
    .get("http://events-clusterip-srv:4005/events")
    .catch((err) => console.log(`text ${err}`));
  console.log(`moderator after restart: ${resp.data}`);
});
