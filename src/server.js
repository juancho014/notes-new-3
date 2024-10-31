const express= require('express');
const path= require('path');
const exphbs= require('express-handlebars');
const Handlebars = require('handlebars');
const morgan= require('morgan');
const cors= require('cors');
const app= express();
const methodOverride= require('method-override');
const flash= require('connect-flash');
const session= require('express-session');
const passport= require('passport');
require('./config/passport')

const options = {
  knownHelpersOnly: false,
  knownHelpers: {
      'foo-helper': true,
      'bar-helper': true
  },
  noEscape: true
};

// Configurar Handlebars con las opciones


app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'secret',
                 resave:true,
                 saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session())

app.use(flash());

app.use((req,res,next)=>{
 res.locals.success_msg= req.flash('success_msg');
 res.locals.error_msg= req.flash('error_msg');
 res.locals.error= req.flash('error');
 res.locals.user=req.user||null;
  next();
})

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  });
  app.engine(".hbs", hbs.engine);
app.use(cors());
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));




module.exports=app;