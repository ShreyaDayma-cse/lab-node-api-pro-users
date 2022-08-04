var express = require('express')
var app = express()
var mongoose = require('mongoose')
const schema =  require('./server.js')
var cors = require('cors')
app.use(express.json())
app.use(cors())
const dburl = 'mongodb+srv://prograd:prograd@prograd-amity.s5wj4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dburl)
.then(()=> console.log('Database Connected'))
.catch((err) => console.log(err))

app.get('/api/users', async function(req,res){
    try{
        const result = await schema.find()
        res.send(result)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/api/users',async function(req,res){

    try{
        const result = await schema.create(req.body)
        res.send('Data Inserted')
    }
    catch(err){
        console.log(err)
    }

})

app.get('/api/users/:id',async function(req,res){

    try{
        const ID = parseInt(req.params.id)
        const result = await schema.findOne({prograd_id:ID})
        res.send(result)
    }
    catch(err){
        console.log(err)
    }

})

app.put('/api/users/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await schema.findOne({prograd_id:ID})
        if(user){
            let updatedUser = await schema.updateOne({prograd_id:ID},{$set:{name:req.body.name}})
            res.json({
                message: 'Record Updated',
                
            })
        }
        else{
            res.json({
                message: 'Record not found',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.delete('/api/users/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await schema.findOne({prograd_id:ID})
        if(user){
            let updatedUser = await schema.deleteOne({prograd_id:ID})
            res.json({
                message: 'Record Deleted',
                
            })
        }
        else{
            res.json({
                message: 'Record not found',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(3000,()=> console.log('Server started at port 3000'))