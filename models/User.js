const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt= require('bcrypt')

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Por favor ingrese un email'],
        unique:true,
        lowecase:true,
        validate:[isEmail,'por favor ingrese un email valido']  ,
        
    },
    password:{
        type:String,
        required:[true,'Por favor ingrese un password'],
        minlength:[6,'que el password contenga mas de 6 caracteres']
    }

})


userSchema.post('save',function(doc,next){
    console.log('el nuevo usuario fue creado y guardado',doc)
    next()
})

userSchema.pre('save',async function(next){
    // console.log('el usuario esta siendo creado y se va a guardar ',this)
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

const User= mongoose.model('usuario',userSchema)

module.exports=User