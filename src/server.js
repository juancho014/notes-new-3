const express= require('express');
const path= require('path');
const exphbs= require('express-handlebars');
const Handlebars = require('handlebars');
const morgan= require('morgan');
const cors= require('cors');
const app= express();
const methodOverride= require('method-override');

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

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  });
  app.engine(".hbs", hbs.engine);
app.use(cors());
app.set('view engine', '.hbs');
app.use(morgan());
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'))




module.exports=app;