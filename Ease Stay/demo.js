// 



const express = require('express');
const app = express();
const mongoose = require('mongoose');
const roomsData = require("./roomData");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Hotel-Rooms');
}

main()
  .then(async () => {
    console.log("Connected to MongoDB");
    // Clear existing data before inserting new data
    await Room.deleteMany({});
    // Check if data exists before inserting
    const count = await Room.countDocuments();
    if (count === 0) {
      await Room.insertMany(roomsData);
      console.log("Rooms data inserted successfully");
    } else {
      console.log("Data already exists in the collection, skipping insertion.");
    }
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  });

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  maxcount: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  rentperday: {
    type: Number,
    required: true,
  },
  imageurls: [], 
  currentBookings: [],
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Room = mongoose.model("Room", roomSchema);

app.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json({
      success: true,
      data: rooms,
      message: "Rooms fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error",
    });
  }
});

app.listen(3001, () => console.log('Server started on port 3001'));
