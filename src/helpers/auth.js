const helpers={}

helpers.isAuthenticated=(req,res,next) => {
    if(req.isAuthenticated()){
        
        return next()
    }
    req.flash('error_msg','no estas autorizado, debes loguearte')
    res.redirect('/users/signin')
}

module.exports=helpers;