var express = require('express');
var router = express.Router();
var Product = require ("../models/product")
var Cart = require ("../models/cart")
var multer = require("multer")
var checkAuth = require ("../middleware/checkAuth")
const fs = require("fs");
var path = require('path');


var storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage }).single("image");
router.use(express.static(__dirname+"./public"));

router.get('/', checkAuth, async function(req, res, next) {
  let products = await Product.find();
  res.render('products/list',{"products": products});
});

router.get('/add',checkAuth, async function(req, res, next) {
  res.render('products/add');
});

router.post('/add', upload,  async function(req, res, next) {
  console.log("request sent", req.file)
  var img = fs.readFileSync(req.file.path, 'base64');
  console.log("Img", img)
  let record = {...req.body, img:img}
  console.log(record)
  let product = new Product(record);
  await product.save();
  res.redirect("/products");
});




router.get("/delete/:id", async function(req, res, next) {
  var id = req.params.id;
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

router.get("/edit/:id", async function(req, res, next) {
  let product = await Product.findById(req.params.id)
  res.render("products/edit", {product});
});
// router.post("/edit/:id",upload, async function(req, res, next) {
//   let product = await Product.findById(req.params.id)

//   var img = fs.readFileSync(req.file.path, 'base64');
//   console.log("Img", img)
//   let record = {...req.body, img:img}
//   console.log(record)

//   product.img = req.body.img;
//   product.name = req.body.name;
//   product.price = req.body.price;

//    product = new Product(record);


//   await product.save();
//   res.redirect("/products");
// });

router.post("/edit/:id", upload, async function(req, res, next) {
  try {
    let product = await Product.findById(req.params.id);
    var img;
    let record; 
    
    if (req.file) {
      // If a file was uploaded, update the product's image
      product.img.data = fs.readFileSync(req.file.path);
      product.img.contentType = req.file.mimetype;
    }

    product.name = req.body.name;
    product.price = req.body.price;

    await product.save();
    res.redirect("/products");
  } catch (error) {
    console.error(error);
    res.redirect("/error");
  }
});














// router.get("/cart/:id", async function(req, res, next) {
//   let product = await Product.findById(req.params.id);
//   console.log(product);
//   let cart = [];
//   if (req.cookies.cart) cart = req.cookies.cart;
//   cart.push(product);
//   res.cookie("cart", cart);
//   console.log("add this product");
//   res.redirect("/products");
// });





// router.get("/cart/remove/:id", async function(req, res, next) {

//   let cart = [];
//   if(req.cookies.cart) {
//      cart = req.cookies.cart;}
//      cart.splice(cart.findIndex((c)=>(c._id == req.params.id)),1)
     
//   res.cookie("cart",cart);
//   console.log("add this product");
//   res.redirect("/cart");
// });


module.exports = router;
