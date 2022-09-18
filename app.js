const db = require("./db.js")
const port = 3000

const express = require("express");
const app = express();

const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html")

app.use(express.static("public"));

app.get("/", (req, res) => {
   res.render("home")
})

app.get("/list", (req, res) => {
    res.render("list", {
        locals: {
            list: db,
            path: req.path
        }
    })
})

app.get("/list/:imdbID", (req, res) => {
    const {imdbID} = req.params
    const item = db.find(i => i.imdbID === imdbID);
    if (item) {
        res.render("item-details", {
            locals: {
                item
            }
        })
    } else {
        res.status(404).send(`no item with ${imdbID}`)
    }
})

app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });


app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})