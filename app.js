const express=require('express');
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const productRoute = require('./routes/product_route')
const createError = require('http-errors');
const dotenv = require('dotenv').config()
// console.log(dotenv.parsed);

require('./initDB')();


app.get('/',(req,res,next)=>{
    res.send('This is the home page')
})

app.use('/products',productRoute)

app.use((req,res,next)=>{
    // let error=new Error();
    // error.status = 400;
    // error.message = 'Hii this page was not found'
    // next(error)
    next(createError('404','This is a custom package error'))
})


app.use((err,req,res,next)=>{
    res.status(err.status)
    // console.log(err);
    res.send({
        error:err.status,
        message:err.message
    })
})

const PORT= process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server has Started at PORT " + PORT +" ....");
})





// app.all is used to refer to all http verbs : get, post , patch and delete


// app.all('/test',(req,res)=>{
//     //handling the query String route
//     console.log(req.query);
//     console.log(req.query.name);
//     res.send(req.query)
// })





// app.all('/test/:name/:age/:profession',(req,res)=>{
//     //handling the route paramater
//     console.log(req.params);
//     console.log(req.params.name);
//     res.send(req.params)
// })





// app.all('/test',(req,res)=>{
//     //handling the request body from client
//     console.log(req.body);
//     console.log(req.body.name);
//     res.send(req.body)
// })

