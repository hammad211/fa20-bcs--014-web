var mongoose =require("mongoose")
var bookingSchema = mongoose.Schema({
    type : String,
    name : String,
    vehicle : String
})

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;