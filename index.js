const express = require('express')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const app=express()
const cookieParser=require('cookie-parser')



app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.set('view engine','ejs')


//conexion de mongodb
const dbURL=''
mongoose.connect(dbURL,{ useNewUrlParser:true, useUnifiedTopology:true })
.then((result)=>app.listen(4000))
.catch((error)=>console.log(error))
//.env

//middleware

//peticiones
/*
get
put
delete
patch
*/

//routes
app.get('/',(request,response)=>{
    response.render('home')

})
app.use(authRoutes)


//cookies
app.get('/set-cookies',(req,res)=>{
 //res.setHeader('Set-Cookie','newUser=true')
 res.cookie('newUser',false)
 res.cookie('esEmpleado',true,{maxAge:1000*60*60*24,httpOnly:true})
 res.send('la cookie fue enviada')
})

app.get('/read-cookies',(req,res)=>{
    const cookies=req.cookies
    console.log(cookies)
})

// app.listen(4000,()=>{
//     console.log('el servidor se esta ejecutando')
// })
