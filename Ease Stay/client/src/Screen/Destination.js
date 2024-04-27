import React from "react";
import { Link } from "react-router-dom";
import { data } from "../resources/cardData";
import Footer from "../pages/home/footer";
import Header from "../components/Header";

const Destination = () => {
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={hotel.image}
                alt={hotel.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{hotel.title}</h2>
                <p className="text-gray-600 mb-4">{hotel.location}</p>
                <p className="text-lg font-bold text-gray-800">
                  ₹{hotel.price} / night
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {hotel.description}
                </p>
                <Link
                  to={hotel.Book_URL}
                  className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destination;
