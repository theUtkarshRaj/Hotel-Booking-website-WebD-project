import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Login from "./LoginScreen";
import StripeCheckout from "react-stripe-checkout";

function Bookingscreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null) {
      setLoggedIn(true);
    }
  }, []);

  async function onToken(token) {
    console.log(token);
    if (!loggedIn) {
      setLoggedIn(false);
      return;
    }

    const bookingDetails = {
      room: room ? { name: room.name, _id: room._id } : null,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
    } catch (error) {
      console.error("Error booking room:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        const data = response.data;

        if (data && data.room) {
          setRoom(data.room);
          const fromDateObj = moment(fromDate, "DD-MM-YYYY");
          const toDateObj = moment(toDate, "DD-MM-YYYY");
          const days = toDateObj.diff(fromDateObj, "days");
          setTotalDays(days);
          const amount = days * data.room.rentperday;
          setTotalAmount(amount);
        } else {
          console.error('Data does not have a valid "room" property:', data);
          setError(true);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid, fromDate, toDate]);

  if (!loggedIn) {
    return <Login />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!room) {
    return <div>No room found with ID: {roomid}</div>;
  }

  return (
    <div className="bg-grey-200 h-full">
      <div className="container shadow-lg rounded-lg p-2 mt-2">
        <div className="row justify-center mt-5">
          <div className="col-md-5">
            <h1 className="text-xl font-bold p-1">{room.name}</h1>
            {room.imageurls.length > 0 && (
              <img
                src={room.imageurls[0]}
                className="h-[60vh] py-4 rounded-md"
                alt=""
              />
            )}
          </div>
          <div className="col-md-5 font-bold flex flex-col item-end pl-10">
            <div className="float-right space-y-1">
              <h1 className="mt-2 font-bold text-2xl">Booking Details</h1>
              <hr />
              <p className="font-bold mt-6">
                Name :{" "}
                <span className="ml-4">
                  {JSON.parse(localStorage.getItem("currentUser")).name}
                </span>
              </p>
              <p className="font-bold">
                From Date: <span className="ml-2">{fromDate}</span>
              </p>
              <p className="font-bold">
                To Date: <span className="ml-4">{toDate}</span>
              </p>
              <p className="font-bold">
                Max Count: <span className="ml-3">{room.maxcount}</span>
              </p>
            </div>
            <div className="space-y-1">
              <h1 className="font-bold mt-6 text-xl">Amount</h1>
              <hr />
              <p className="font-bold">
                Total Days : <span className="ml-3">{totalDays}</span>{" "}
              </p>
              <p className="font-bold">
                Rent per day: <span className="ml-3">{room.rentperday}</span>
              </p>
              <p className="font-bold">
                Total Amount:{" "}
                <span className="ml-2 text-lg">{totalAmount}</span>
              </p>
            </div>
            <StripeCheckout
              amount={totalAmount * 100}
              token={onToken}
              currency="INR"
              stripeKey="pk_test_51P8QsaSASzuvZYIqyEWaN1Qjh6hWAezVuCWFK3kZOQU9sE3jbm11lTNjN1DyLX9p9RxbP7jf2UFg48ZSUj90LPBI005YLKwp1W"
            >
              {" "}
              <div className="btn btn-dark mt-4 m-auto ">
                Pay Now
              </div>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingscreen;
