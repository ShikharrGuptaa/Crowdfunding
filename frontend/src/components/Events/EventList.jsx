import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/api";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error(`Error fetching events: `, error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Event List</h2>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <p className="font-bold text-green-600 mb-2">
                Goal: ${event.goalAmount}
              </p>
              <p className="text-gray-500 mb-2">
                Raised: ${event.amountRaised}
              </p>
              <Link
                to={`/event/${event._id}`}
                className="text-blue-500 hover:underline mt-auto"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No events available</p>
      )}
    </div>
  );
};

export default EventList;
