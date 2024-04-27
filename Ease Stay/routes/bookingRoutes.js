const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require('moment');
const Room = require('../models/room');
const stripe = require('stripe')('sk_test_51P8QsaSASzuvZYIq5pG577aDdyRserVnqiJrQ2aE1MCYizTrWCWb4frF1LIDeC94TVGP4lDA3MnnAfRc5z7gsKgW00eJhjf4lj')
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
  try {
    const { room, userid, fromDate, toDate, totalAmount, totalDays ,token } = req.body;


  //  try{
  //   const customer = await stripe.customer.create({
  //     email:token.email,
  //     source: token.id
  //   })
  //   const payment = await strip.charges.create(
  //     {
  //     amount : totalAmount*100,
  //     customer: customer.id,
  //     currency:"inr",
  //     reciept_email:token.email
  //   },{
  //     idempotencyKey : uuidv4()
  //   })

  //   if(payment){
      
  //   }

  //   res.send("Payment Successful , Your Room is Booked")
  // }
  //  catch(error){
  //   return res.status(400).json({error});
  //  }







    // Create a new booking object
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromDate: moment(fromDate).format('DD-MM-YYYY'),
      toDate: moment(toDate).format('DD-MM-YYYY'),
      totalAmount,
      totalDays,
      transactionId: uuidv4(), // Generate a unique transaction ID using UUID
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Update the room with the new booking information
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbooking.push({
      bookingid: savedBooking._id, // Access the _id of the saved booking
      fromDate: moment(fromDate).format('DD-MM-YYYY'),
      toDate: moment(toDate).format('DD-MM-YYYY'),
      userid: userid,
      status: savedBooking.status // Assuming status is a property of Booking model
    });
    await roomtemp.save();

    // You can perform Stripe integration here for payment processing if needed

    // Return the updated room information along with the saved booking details
    res.status(200).json({
      message: "Booking successful",
      bookingDetails: savedBooking,
      updatedRoom: roomtemp // Include updated room information
    });
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ message: "Failed to book room" });
  }
});

module.exports = router;
