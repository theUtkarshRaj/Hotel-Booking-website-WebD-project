import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Header from "../components/Header";
import Loader from "../components/Loader";
import moment from "moment";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
const { RangePicker } = DatePicker;

function HotelScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data;

        if (data && Array.isArray(data.rooms)) {
          setRooms(data.rooms);
          setDuplicateRooms(data.rooms);
        } else {
          console.error('Data does not have a valid "rooms" array:', data);
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"));
    setToDate(moment(dates[1].$d).format("DD-MM-YYYY"));

    const tempRooms = [];

    for (const room of duplicateRooms) {
      let isAvailable = true; // Assume the room is initially available

      for (const booking of room.currentbookings) {
        // Check if the selected range overlaps with any existing booking
        if (
          moment(dates[0]).isBetween(
            booking.fromDate,
            booking.toDate,
            undefined,
            "[]"
          ) ||
          moment(dates[1]).isBetween(
            booking.fromDate,
            booking.toDate,
            undefined,
            "[]"
          ) ||
          moment(booking.fromDate, "DD-MM-YYYY").isBetween(
            dates[0],
            dates[1],
            undefined,
            "[]"
          ) ||
          moment(booking.toDate, "DD-MM-YYYY").isBetween(
            dates[0],
            dates[1],
            undefined,
            "[]"
          )
        ) {
          isAvailable = false; // Room is not available if there's an overlap
          break; // No need to check further if room is not available
        }
      }

      if (isAvailable) {
        tempRooms.push(room); // Add the room to tempRooms if it's available
      }
    }

    setRooms(tempRooms); // Update rooms after checking availability for all rooms
  }
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }
  function filterByType(e){
    setType(e)
   if(e!=="all"){
    const temprooms = duplicateRooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(temprooms);
   }
   else{
    setRooms(duplicateRooms);
   }
  }

  return (
    <div className="bg-slate-300">
      <Header />
      <div className="row justify-center mt-2">
        <div className="flex justify-center gap-4">
          <div className="col-md-3 ">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>
          <div className="col-md-5 ">
            <input
              type="text"
              className="form-control shadow-xl"
              placeholder="Search Rooms"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
          </div>
          <select className="rounded=lg shadow-xl form-control" value={type}
          onChange={(e)=>{filterByType(e.target.value)}} >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="Non-delux">Non-Delux</option>
          </select>
        </div>

        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          rooms.map((room, id) => {
            return (
              <div key={id} className="col-md-9 mt-2">
                <Room room={room} id={id} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HotelScreen;
