const express = require("express")
const multer = require('multer')
const session = require("express-session") //import the session method

const upload = multer()
const app = express()
app.use(express.static("public/assets"));
app.use(upload.array()); // Handle multipart/form-data
app.use(express.urlencoded({ extended: true })); // Parse urlencoded bodies
app.use(express.json()); // Parse JSON bodies
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render('home')
  })

app.listen(3000)