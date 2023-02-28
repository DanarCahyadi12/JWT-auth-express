const { urlencoded } = require("express")
const express = require("express")
const router = require("./Routes/route")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
        credentials :true,
        origin : ["http://localhost:8000"],

}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/",router)



app.listen(8000,()=> {
    console.log("SERVER RUNNING")
})