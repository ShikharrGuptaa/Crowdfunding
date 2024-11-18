import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{user.name}'s Profile</h2>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Contributions:</strong> {user.contributions}
        </p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
