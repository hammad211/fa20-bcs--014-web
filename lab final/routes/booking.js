var express = require('express');
var router = express.Router();
var Booking = require ("../models/booking")

/* GET home page. */
router.get('/',async function(req, res, next) {
  let booking = await Booking.find();
  console.log(booking);
  res.render('file', {"booking":booking});
});

router.get('/add', function(req,res,next){
  res.render("booking/add");
})

router.post('/add', async function(req, res, next) {
  let book = new Booking(req.body);
  await book.save();
  res.redirect("/booking");
});

router.get("/delete/:id", async function(req, res, next) {
  var id = req.params.id;
  let product = await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/booking");
});


module.exports = router;
