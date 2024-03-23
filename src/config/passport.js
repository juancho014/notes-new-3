const passport= require('passport');
const localStrategy=require('passport-local').Strategy;
 const User= require('../models/User');
passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'

},async(email,password,done)=>{
 const user= await User.findOne({email})
 if (!user) {
     return done(null,false,{message:'Usuario no encontrado'})
 }else{
     const isMatch= await user.comparePassword(password)
     if (isMatch) {
         return done(null,user)
     }else{
         return done(null,false,{message:'Contraseña incorrecta'})
     }
 }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser(async(id,done)=>{
    const user= await User.findById(id).lean()
    done(null,user)
});