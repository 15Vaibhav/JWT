var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

app.get('/get',(req,res)=>{
    res.json({message:"hello"})
})
app.post('/post',(req,res)=>{
var  password = '123456789';
var  name =  'SPECC';
var token = jwt.sign({name:name,password:password},'serverkey');
res.send(token);
})
app.post('/verify',verifyToken,(req,res)=>{
    jwt.verify(req.token,'serverkey',(err,authData)=>{
     if(err){
        res.sendStatus(403)
     }else{
        res.json({message:"hello welocme to secure route",
       authData:authData
    })
     }
    })
    
})
 function verifyToken(req,res,next){
       const data = req.headers['auth'];
       if(typeof(data !=='undefined')){
        //   var t = data.split(' ');
          var tok = data;
          req.token = tok;
          next();
       }else{
           res.sendStatus(403);
       }

 }


app.listen('4000',()=>{
    console.log('server...');
})