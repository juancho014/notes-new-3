const usersCtrl={};
const passport=require('passport');

require('../server');

const User =require('../models/User')

usersCtrl.renderSignUpForm =(req,res)=>{

    res.render('users/signUp')
}

usersCtrl.signup = async(req,res)=>{
    const errors=[]
    const{name,email,password,confirm_password}=req.body;
    if (password != confirm_password) {
        errors.push({text:'Las contraseñas no coinciden'})  
    }if (password.length < 4) {
        errors.push({text:'La contraseña debe tener al menos 4 caracteres'})
    }if (errors.length > 0) {
        res.render('users/signUp',{errors,name,email,password,confirm_password})
    }else{
      const emailUser=await  User.findOne({email:email});
        if (emailUser) {
            req.flash('error_msg','el correo ya esta en uso')
            res.redirect('/users/signUp');
        }else{
            const newUser= new User({name,email,password})
            newUser.password= await newUser.encryptPassword(password)
           await newUser.save()
            req.flash('success_msg','Usuario creado correctamente')
          res.redirect('/users/signin')
         
        }
    }
 
    
}

usersCtrl.renderSigninForm =(req,res)=>{

    res.render('users/signin')
}

usersCtrl.signin =(req,res)=>{
    passport.authenticate('local',{
        successRedirect:'/notes',
        failureRedirect:'/users/signin',
        failureFlash:true
    })(req,res)
    
}

usersCtrl.logout =(req,res)=>{
   
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada" );
        res.redirect( "/users/signin" );

    });
}

module.exports = usersCtrl;