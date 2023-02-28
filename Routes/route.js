const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {Register,Login,Logout} = require("../controller/user")
const Auth = (req,res,next) => {
    const token = req.cookies.myToken
    try {
        if (!token) {
            throw "Acces denied"
        }
        const user = jwt.verify(token,'SECRET')
        req.user = user
        next()
    }catch(err){
        res.clearCookie("myToken")
        return res.status(400).json({
            massage : err
        })
    }

}
router.post("/register",Register)
router.post("/",Login)
router.get("/overview",Auth,(req,res) => {
    res.status(200).json({
        massage : `Welcome ${req.user.username}`
    })
})

router.get("/logout",Logout)


module.exports = router