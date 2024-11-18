import React, { useState } from "react";
import axios from "axios";
import { createEvent } from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {  // No async here
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEvent({
        title,
        description,
        goalAmount,
        deadline,
      });
      
      setSuccessMessage("Event Created Successfully!");
      
      const eventID = response.data.eventId;  // Assuming this gives the event ID
      // console.log(response.data);
      setTimeout(() => {
        navigate(`/event/${eventID}`);  // Redirect to event page
      }, 1500);

    } catch (error) {
      console.error(`Error creating event: `, error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Event</h2>
        
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
            Event Title
          </label>
          <input
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
            Event Description
          </label>
          <textarea
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="goalAmount" className="block text-gray-700 font-semibold mb-1">
            Goal Amount
          </label>
          <input
            type="number"
            placeholder="Enter goal amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-semibold mb-1">
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md"
        >
          Create Event
        </button>
      </form>

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition transform duration-300 ease-in-out translate-y-0 opacity-100">
          {successMessage}
        </div>
      )}

    </div>
  );
};

export default CreateEvent;
