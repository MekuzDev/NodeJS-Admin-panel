const express= require('express')
const router = express.Router()
const Post = require('../../models/Post')
const {isEmpty} = require('../../helpers/upload-helper')

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin'
    next()
})

router.get('/create',(req,res)=>{
    res.render('admin/posts/create')
 })

 router.get('/',(req,res)=>{
    Post.find({}).then(posts=>{
        res.render('admin/posts/index',{posts:posts})
    }).catch(err=>{
        console.log(err);
    })
 }) 

// Post 
 router.post('/create',(req,res)=>{
let filename = 'http://lorempixel.com/100/100/people/' ;
    if(!isEmpty(req.files)){
        let file = req.files.file
        filename = file.name
    file.mv('./public/uploads/'+filename,(err)=>{
        if (err) throw err
    })
 
    }
   
   
     let allowComments = true
     if(req.body.allowComments){
         allowComments=true
     }else{
         allowComments =false
     }


  const newpost = new Post({
        title:req.body.title,
        status:req.body.status,
        allowComments:allowComments,
        body:req.body.body,
        file:filename
    })
   newpost.save().then(saved=>{
       res.redirect("/admin/posts")
   })  
 })

 router.get('/edit/:id',(req,res)=>{
     const id = req.params.id
     Post.findOne({_id:id}).then(post=>{
        res.render('admin/posts/edit',{post:post})
     }).catch(err=>{
         console.log(err);
     })
    
 })

router.put('/edit/:id',(req,res)=>{
     
Post.findOne({_id:req.params.id})

.then(post=>{
    if(req.body.allowComments){
        allowComments=true
    }else{
        allowComments =false
    }
    
      
    post.title = req.body.title
    post.status = req.body.status
    post.allowComments=allowComments
    post.body = req.body.body
      
    post.save().then(updated=>{
  
        res.redirect('/admin/posts');

    })
        


})




})


router.delete('/:id',(req,res)=>{{
    Post.deleteOne({_id:req.params.id})
    .then(result=>{
        res.redirect('/admin/posts')
    })
}})

module.exports = router