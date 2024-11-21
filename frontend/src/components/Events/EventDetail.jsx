import React, { useEffect, useState } from "react";
import { getEventById, getUserById } from "../../services/api";
import { useParams } from "react-router-dom";
import Contribute from "../Contributions/Contribute"; // Importing the Contribute component

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [aggregatedContributors, setAggregatedContributors] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response.data);

        // Aggregating contributions by userId
        const contributionMap = {};
        response.data.contributors.forEach((contributorId) => {
          if (contributionMap[contributorId]) {
            contributionMap[contributorId] += 1; // Assuming each entry represents 1 contribution
          } else {
            contributionMap[contributorId] = 1;
          }
        });

        // Fetch user details for each unique contributor
        const contributorDetails = await Promise.all(
          Object.keys(contributionMap).map(async (userId) => {
            const userResponse = await getUserById(userId);
            return {
              userId,
              name: userResponse.data.name, // Assuming user response has a 'name' field
              totalAmount: contributionMap[userId], // Total contributions
            };
          })
        );

        setAggregatedContributors(contributorDetails);
      } catch (error) {
        console.error(`Error fetching event details: `, error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {event.description}
        </p>
        <p className="text-green-600 mb-2">
          <strong>Goal:</strong> ${event.goalAmount}
        </p>
        <p className="text-blue-600 mb-2">
          <strong>Raised:</strong> ${event.amountRaised}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Deadline:</strong> {new Date(event.deadline).toDateString()}
        </p>
        <p className="text-gray-500 mb-2">
          <strong>Status:</strong> {event.status}
        </p>
      </div>

      {/* Contribute Component */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-4">Contribute to this Event</h4>
        <Contribute eventId={event._id} />
      </div>

      <div className="mt-6">
        <h4 className="text-2xl font-semibold mb-4">Top Contributors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aggregatedContributors.map((contributor) => (
            <div
              key={contributor.userId}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h5 className="text-lg font-bold">{contributor.name}</h5>
              </div>
              <div className="mt-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Total Contributions:</span>{" "}
                  {contributor.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
