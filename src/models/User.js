const {Schema,model}= require('mongoose');
const bcrypt= require('bcrypt');
const User= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true
    },
    password:{
            type:String,
            required:true
        }
},{timetamps:true,
versionKey:false});

User.methods.encryptPassword=async (password)=>{
  const salt= await bcrypt.genSalt(10);
 return await bcrypt.hashSync(password, salt)
};

User.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports=model('User',User);