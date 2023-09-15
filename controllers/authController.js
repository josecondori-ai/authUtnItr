const User=require("../models/User")


//manipulacion de errores
const handleError=(err)=>{
    console.log(err.message,err.code)
    let errors={email:'',password:''}

    //duplicidad
    if( err.code===11000){
        errors.email='el email ya esta  registrado use otro'
        return errors
    }

    //validacion de errores
    if(err.message.includes('usuario validation failed')){
       Object.values(err.errors).forEach(({properties})=>{

        errors[properties.path]=properties.message


       })
    }
    return errors

}

module.exports.signup_get=(req,res)=>{
    res.render('signup')
}

module.exports.login_get=(req,res)=>{
    res.render('login')
}


module.exports.signup_post= async (req,res)=>{
    //console.log(req)
    const {email,password}= req.body
   
    try{
            const user=await User.create({email,password})
            res.status(201).json(user)
    }
    catch (error){

            console.log(error)
            const errors=handleError(error)
            res.status(400).json({errors})


    }
    

}


module.exports.login_post=async(req,res)=>{
    res.send('usuario logueado')
}

