require('dotenv').config()
 require('./database')
 const app=require('./server');
 const PORT=process.env.PORT||8080;



 app.listen(PORT,()=>{console.log(`funcionando en el puerto ${PORT}`);})