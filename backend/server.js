const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 4055;
app.use(cors()) 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://suganesh234:Zn504C825ofnj2pk@cluster0.zszetat.mongodb.net/person-details')
.then(()=> {console.log('connected to mongodb')})
.catch((error)=> {console.log('Error in connecting:',error)})
const userSchema = new mongoose.Schema({
        fname:{
    type:String,
    // required:true
},
mail:{
    type:String,
    // required:true
  },
  phoneNumber:{
    type:String,
    // required:true
  },
  website:{
    type:String,
    // required:true
  },
  contactName:{
    type:String,
    // required:true
  },
  contactMobile:{
    type:String,
    // required:true
  },
  contactMail:{
    type:String,
    // required:true
  },
  notes:{
    type:String,
    // required:true
  },
  type:{
    type:String,
    // required:true
  },
  category:{
    type:String,
    // required:true
  },
  commissionPercentage:{
    type:Number,
    // required:true
  },
 ActiveFrom:{
    type:Date,
    // required:true
  },
  criticalAccount:{
    type:Array,
    // required:true
  },
  PaymentOptions:{
    type:String,
    // required:true
  },
});
const users = mongoose.model('User', userSchema);

app.get('/users', function (req, res) {
  users.find()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


app.put('/user/:id', function(req, res){
  const userId = req.params.id;
  const objectId = mongoose.Types.ObjectId(userId);
  User.findByIdAndUpdate(userId, req.body, { new: true,useFindAndModify: false })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});
app.post('/users', (req, res) => {
  const userData = req.body;

  const newUser = new User(userData);

  newUser.save()
    .then(() => res.json(newUser))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Delete user by ID
app.delete('/:id', function(req, res){
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  User.findByIdAndDelete(userId)
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      console.log('Deleted user:', deletedUser);
      res.json(deletedUser);
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  const objectId = mongoose.Types.ObjectId(userId);
  User.findByIdAndDelete(userId)
    .then(deletedUser => {
      res.json(deletedUser);
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(400).json({ error: err.message });
    });
});
const User = mongoose.model('User',userSchema)
app.post('/',function(req,res){
  console.log(req.body)
  res.send('send data successfully')
  var userdata =new User({
    fname:req.body.fname,
    mail:req.body.mail,
    phoneNumber:req.body.phoneNumber,
    website:req.body.website,
    contactName:req.body.contactName,
    contactMobile:req.body.contactMobile,
    contactMail:req.body.contactMail,
    notes:req.body.notes,
    type:req.body.type,
    category:req.body.category, 
    commissionPercentage:req.body.commissionPercentage,
    ActiveFrom:req.body.ActiveFrom,
    criticalAccount:req.body.criticalAccount,
    PaymentOptions:req.body.paymentOptions
});
  userdata.save().then(()=>{res.send('send data successfully')})
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});