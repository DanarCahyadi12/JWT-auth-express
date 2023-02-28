const conn = require('../connect')
const jwt = require("jsonwebtoken")
const Register  = async (req,res) => {
    let sql = "INSERT INTO user (username,email,password,point,ranks,total_quiz,description) VALUES(?,?,?,?,?,?,?)"
    const {name,email,password,phone,address}= req.body
    conn.query(sql,[name,email,password,phone,address],(err) => {
        if (err) return res.status(500).json({massage : err})
        res.status(200).json({massage : "Register succesfully"})
    })
}

const Login = async (req,res) => {
    let sql = "SELECT * FROM user WHERE email = ? AND password = ?"
    const {email,password} = req.body
    conn.query(sql,[email,password],(err,data) => {
        if (err) return res.status(500).json({massage : err})
        if (data.length > 0 ){
            const token = jwt.sign({
                id : data[0].iduser,
                username : data[0].username 
            },'SECRET',{expiresIn : '1h'})
            res.cookie("myToken",token,{httpOnly : true},)
            res.status(200).json({massage : "Login succes",data})  
    
        } 
        else{
            res.status(403).json({massage : "Email or password invalid"})
        } 
        
    })
}
const Logout = (req,res,next) => {
    res.clearCookie('myToken')
       return res.status(200).json({massage : "Logout succesfully"})
}
module.exports = {Register,Login,Logout}