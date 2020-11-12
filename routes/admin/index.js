const express= require('express')
const router = express.Router()
const faker = require('faker')
const User = require('../../models/Post')

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin'
    next()
})

router.get('/',(req,res)=>{
    res.render('admin/index')
 })

 
 
 router.get('/create-user',(req,res)=>{
    res.render('admin/create-user')
 })

 router.get('/users',(req,res)=>{
    res.render('admin/users')
 })

 router.post('/generate-fake-posts',(req,res)=>{
    for(let i = 0 ; i < req.body.amount; i++){
       let post = new User()
      
      post.title = faker.name.title()
      post.status = faker.random.boolean()?"public":"private"
      post.allowComments = faker.random.boolean()
      post.body =faker.lorem.sentence()

       post.save().then(saved=>{
          res.redirect('/admin/posts')
       })
   }
 })

module.exports = router