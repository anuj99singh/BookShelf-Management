const express = require('express');
const app = express()
const exphbs = require('express-handlebars')
const books = require('./books/booksDetails')
const fs = require('fs');
const { json } = require('express');
const path = require('path');
const  mongoose  = require('mongoose');
const mongobook = require('../bookManagement/books/Database/Model')



app.use(express.json())
app.use(express.urlencoded({extended : false}))

// app.use('/issue' , require('./routes/bookRoutes'))

mongoose.connect('mongodb://localhost/mongobook',  {useNewUrlParser: true, useUnifiedTopology: true})


app.get('/saveNewBook',(req,res) =>{

    // var bookrecord = new model ({
    //     bookname = 'philosiphy',
    //     takenby = none
    // });
    var bookrecord = new mongobook({bookname : req.body.bname, takenby : req.body.myname})
    bookrecord.save(function (err,bookrecord) {
        if(err) {console.log(err)}
        console.log(bookrecord.bookname)
    })
    res.send(`book added`)

})

app.get('/issue', (req, res)=>{
       
        mongobook.findOne({bookname : req.body.bname}, (err, data)=>{
            if(err){
                throw err;
            }
            if(!data){
                res.send(`book is not found in shelf`)
            }
            else{
                if(data.takenby === "none"){
                    // res.send(`yee.. you can grabit`)
                    mongobook.updateOne({bookname : req.body.bname}, {takenby : req.body.myname}, (err,aff)=>{
                     if(err){res.send(err)}
                     else{
                         res.send(`${req.body.bname} is issued to ${req.body.myname}`)
                     }
                    })
                }
                else if(data.takenby === req.body.myname){
                    res.send(`you have the book idiot ${data.takenby}`)
                }
                else{
                    res.send(`${data.takenby} have the book, try it later`)
                }
            }
        })
    
})

app.get('/update', (req, res)=>{
    mongobook.updateOne({bookname : req.body.bname}, {takenby : req.body.myname}, (err,aff)=>{
        if(err){res.send(err)}
        else{
            res.send(aff)
        }
    })
})

app.get('/',(req,res) =>{
    res.write(`hey enten any useful url`)
})
const port = 5000
app.listen(port, (req,res) =>{
    console.log(`server running on port ${port} `)
}) 