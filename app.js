const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({extended: true}));
const mongodb = 'mongodb+srv://abhijeet:Abhi123@cluster0.j9dd8.mongodb.net/item-database?retryWrites=true&w=majority';
mongoose.connect(mongodb,{useNewUrlParser: true}, {useUnifiedTopology: true}).then(()=>{console.log('connected')
}).catch(err=>console.log(err))


app.set('view engine','ejs');
// app.get('/create-item',(req,res)=>{
//   const item = new Item({
//     name:'phone',
//     price: 1000
//   });
//   item.save().then(result=>res.send(result))
// })




// app.get('/get-item',(req,res)=>{
 
//   Item.findById().then(result=>res.send(result)).catch(err=>console.log(err))
// })
app.get('/',(req,res)=>{
 res.redirect('/get-items');
})

app.get('/get-items',(req,res)=>{
 Item.find().then(result=>{
   res.render('index',{items:result});
   }).catch(err=>console.log(err))
})
app.get('/add-item',(req,res)=>{
  res.render('add-item');  
})
app.post('/items',(req,res)=>{
  const item = Item(req.body);
  item.save().then(()=>{
    res.redirect('/get-items')
  }).catch(err=>console.log(err))
})

app.get('/items/:id',(req,res)=>{
  const id = req.params.id;
  Item.findById(id).then((result=>{
    res.render('item-detail',{item:result})
  }))
})

app.delete('/items/:id',(req,res)=>{
  const id = req.params.id;
  Item.findByIdAndDelete(id).then(result=>{
    res.json({redirect: '/get-items'})
  })
})
app.put('/items/:id',(req,res)=>{
  const id = req.params.id;
  Item.findByIdAndUpdate(id,req.body).then(result=>{
    res.json({msg: 'Data  Updated SuccessFully'})
  })
})

app.use((req, res)=>{
  res.render('error');  
})


const port = process.env.PORT || 3000;
app.listen(port);