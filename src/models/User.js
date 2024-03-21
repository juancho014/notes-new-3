const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const User= mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    password:{
            type:String,
            required:true
        }
},{timetamps:true});

User.methods.encryptPassword=async password=>{
  const salt= await bcrypt.genSalt(10);
 return await bcrypt.hash(password, salt)
};

User.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports=User;