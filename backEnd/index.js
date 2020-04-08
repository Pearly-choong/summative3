const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects
const Product = require('./models/product.js'); //this refers to the structure for product ojects
const Comment = require('./models/comment.js'); //this refers to the structure for comment ojects

const port = 3000; //set server port

//connect to db

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/summative3db?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('DB connected!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('We are connected to mongo db'); // success message
});


//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // for creating encrypted passwords
app.use(cors());



// ***************  code from Pearly start

//sets request format
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`); //missed this bit but keep it
  next();//include this to go to the next middleware
});

//prints message on load testing
app.get('/', (req, res) => res.send('Hello World!'))

// add new comment
app.post('/addComment', (req,res)=> {
      const productComment = new Comment({
        _id : new mongoose.Types.ObjectId,
        message : req.body.message,
        postby : req.body.postby,
        date : req.body.date,
        user_id : req.body.user_id,
        product_id : req.body.product_id
      });
      //save to database and notify the user accordingly
      productComment.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
}); //end of add new comment


// get comment by product id
app.get('/allComments/p=:id', (req,res)=> {
  const idParam = req.params.id;
  Comment.find({product_id:idParam},(err, result)=>{
    if(result.length> 0){
      res.send(result)
    }
    else{
      res.send("No comments with this product ID")
    }
  }).catch(err => res.send(err));
}); // end of get comment by product id



//get product by user id
app.get('/allProducts/u=:id', (req,res)=>{
  const idParam = req.params.id;
  Product.find({user_id:idParam}, (err, result)=>{
    if(result.length> 0){
      res.send(result)
    }
    else{
      res.send("Can't find product with this ID")
    }
  }).catch(err => res.send(err));
}); // end of get product by user id


//get product by category
app.get('/allProducts/cat=:category', (req,res)=>{
  const pCategory = req.params.category;
  Product.find({category:pCategory}, (err, result)=>{
    if(result.length> 0){
      res.send(result)
    }
    else{
      res.send("There's no product in this category")
    }
  }).catch(err => res.send(err));
}); // end of get product by user id


// code from Pearly end here




// ********** code from Vandy start
// Adding a product
app.post('/addProduct' , (req,res) =>{
	const product = new Product({
		_id : new mongoose.Types.ObjectId,
		category : req.body.category,
		businessName : req.body.businessName,
		productName : req.body.productName,
		price : req.body.price,
		flavour : req.body.flavour,
    description : req.body.description,
		productImageUrl : req.body.productImageUrl,
		user_id : req.body.user_id
	});
	// Pushes product to database
	product.save().then(result =>{
		res.send(result);
	}).catch(err =>res.send(err));
});    //addProduct ends here.

// View products
app.get('/allProducts', (req,res) =>{
	Product.find().then(result =>{
		res.send(result);
	});
});  //allProducts end here.

// Updating a product
app.patch('/updateProduct/:pID' , (req,res) =>{
	// stores inputted project ID
	const idParam = req.params.pID;
	// Finds the relating Project with the same id
	Product.findById(idParam , (err,project) =>{
		// Updates the listed properties
		const updateProduct = {
      // _id : new mongoose.Types.ObjectId,
      category : req.body.category,
      businessName : req.body.businessName,
      productName : req.body.productName,
      price : req.body.price,
      flavour : req.body.flavour,
      description : req.body.description,
      productImageUrl : req.body.productImageUrl,
		};
		// Updates the one matching project instead of all of them
		Product.updateOne({_id:idParam}, updateProduct).then(result =>{
			res.send(result);
		}).catch(err =>res.send(err));
	// If the user has entered the wrong id and the project cannot be found
}).catch(err =>res.send('Product not found'));
});  //updateProduct/:id ends here.


// Delete a product
app.delete('/deleteProduct/:pID', (req,res) =>{
	const idParam = req.params.pID;
	Product.findOne({_id:idParam}, (err,product) =>{
		if (product){
			Product.deleteOne({_id:idParam}, err =>{
				res.send('Product successfully deleted');
			});
		} else {
			res.send('Error: Not Found');
		}
	}).catch(err => res.send(err));
});

// code from Vandy end here





//********** code from Kristine start



// code from Kristine end here


//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))