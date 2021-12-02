const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const authRoute = require("./routes/auth")
const clubRoute = require("./routes/club")

dotenv.config()

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000

//middleware
app.use(express.json())
app.use(cors())

app.options("*", cors())

app.get("/", (req, res) => {
  res.send("Hello I'm up!")
})

//route middleware
app.use("/api/user", authRoute)
app.use("/api/club", clubRoute)

const main = async () => {
  // Connect to db
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("Connected to db")
  // Start the server
  app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`))
}

main().catch(console.log)
