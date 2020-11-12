const express = require('express');
const app = express()
const path = require('path')
const handlebars = require('handlebars')
const exhbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const admin = require('./routes/admin/index')
const main = require('./routes/home/main')
const posts = require('./routes/admin/posts')
const db = require('mongoose');
const cors = require('cors')
const methodOverride = require('method-override')
const upload  = require('express-fileupload')

db.connect('mongodb://127.0.0.1:27017/teknik_cms',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err,res)=>{
    if(err) return err 
    console.log("MongoDb Connected");
})



app.use(express.static(path.join(__dirname,'public')))


const {select } = require('./helpers/handlebars_helpers')
app.engine('handlebars',exhbs({
    defaultLayout:'home',
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers:{select:select}
}))
app.set('view engine','handlebars')

// file upload
app.use(upload())

// Adding Body parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use('/admin',admin)
app.use('/admin/posts',posts)
app.use('/',main)

app.listen(4500,()=>{
    console.log("Server started on Port:4500");
})  