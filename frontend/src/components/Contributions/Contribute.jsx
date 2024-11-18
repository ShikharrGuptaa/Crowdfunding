import React, { useState } from "react";
import { getCheckoutURL, fetchCurrentUserId } from "../../services/api";

const Contribute = ({ eventId, contributorId }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleContribute = async () => {
    if (!amount || amount <= 0) {
      setError(`Please enter a valid contribution amount.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const contributorId = await fetchCurrentUserId();

      if(!contributorId) {
        throw new Error("Failed to retrieve user ID. Please login and try again.");
      }
    

      // Initiating checkout by getting URL
      const { url } = await getCheckoutURL(eventId, amount, contributorId);

      //Redirecting user to checkout page
      window.location.href = url;
    } catch (err) {
      setError(`Failed to initiate payment. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Contribute to this Event
      </h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleContribute}
        disabled={loading}
        className={`w-full bg-blue-500 text-white py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {loading ? "Processing..." : "Contribute"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Contribute;
