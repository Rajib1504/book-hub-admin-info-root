import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi"; // Edit icon
import { useAuth } from "../context/AuthProvider";

const Profile = () => {
  // 'edit mode' চালু বা বন্ধ করার জন্য state
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  console.log(user);
  // ডামি ডেটা
  const adminData = {
    name: "Eric Frusciante",
    email: "eric@frusciante.com",
    imageUrl:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=1160",
  };

  // ফর্ম সাবমিট হ্যান্ডলার (আপাতত শুধু কনসোলে লগ করবে)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Updating profile...");
    console.log("New Password:", newPassword);
    // এখানে ফাইল আপলোড এবং পাসওয়ার্ড আপডেটের API কল হবে
    setIsEditing(false); // এডিট মোড বন্ধ করি
  };

  // ইনপুট ফিল্ডের জন্য কমন স্টাইল
  const inputClass =
    "w-full rounded-md border border-gray-300 p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl">
        {!isEditing ? (
          /* --- 1. Display View (যখন এডিট করা হচ্ছে না) --- */
          <>
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Admin Profile
            </h2>

            {/* প্রোফাইল ছবি */}
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full object-cover flex justify-center items-center shadow-lg text-5xl bg-green-300">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* প্রোফাইল তথ্য */}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Password:</span>
                <span className="font-mono text-lg text-gray-800">
                  ********
                </span>
              </div>
            </div>

            {/* এডিট বাটন */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-600 p-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <HiOutlinePencilAlt className="h-5 w-5" />
              Edit Profile
            </button>
          </>
        ) : (
          /* --- 2. Edit View (যখন এডিট করা হচ্ছে) --- */
          <form noValidate onSubmit={handleSubmit}>
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Edit Profile
            </h2>

            {/* ছবি আপলোড */}
            <div className="flex flex-col items-center">
              <img
                className="h-32 w-32 rounded-full object-cover shadow-lg"
                src={adminData.imageUrl}
                alt="Admin Profile"
              />
              <label
                htmlFor="profileImage"
                className="mt-4 cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
              >
                Change Image
                <input id="profileImage" type="file" className="hidden" />
              </label>
            </div>

            {/* পাসওয়ার্ড সেকশন */}
            <fieldset className="mt-8 space-y-4 rounded-lg border border-gray-300 p-4">
              <legend className="px-2 text-sm font-medium text-gray-700">
                Change Password
              </legend>
              <div>
                <label htmlFor="newPassword" className={labelClass}>
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className={inputClass}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={inputClass}
                  placeholder="Confirm new password"
                />
              </div>
            </fieldset>

            {/* সেভ ও ক্যানসেল বাটন */}
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full cursor-pointer rounded-md border border-gray-300 bg-white p-3 font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-blue-600 p-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
