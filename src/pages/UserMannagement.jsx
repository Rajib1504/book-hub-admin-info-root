import React, { useEffect, useState } from "react";
import { HiTrash, HiSearch, HiBan, HiCheckCircle } from "react-icons/hi";
import TitleGenerate from "../hooks/TitleGenerate";
import axiosInstance from "../utils/Axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ফিল্টার এবং পেজিনেশন স্টেট
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  // ১. ইউজার ফেচ করা (Read)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // সার্চ কুয়েরি সহ API কল
      const { data } = await axiosInstance.get(`/users?page=${page}&limit=${limit}&search=${search}`);
      if (data.success) {
            // console.log(data);
        setUsers(data.data);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // সার্চ বা পেজ পাল্টালে ডাটা রিলোড হবে
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500); // সার্চের সময় একটু ডিলে (Debounce)

    return () => clearTimeout(delayDebounceFn);
  }, [page, search]);

  // ২. ইউজার ডিলিট করা (Delete)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosInstance.delete(`/users/${id}`);
          if (data.success) {
            Swal.fire("Deleted!", "User has been removed.", "success");
            fetchUsers();
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  // ৩. স্ট্যাটাস পরিবর্তন করা (Suspend/Active)
  const handleStatusToggle = async (user) => {
    const newStatus = user.accountStatus === "active" ? "suspended" : "active";
    const actionText = newStatus === "suspended" ? "Suspend" : "Activate";

    try {
      // অপটিমিস্টিক আপডেট (আগে UI চেঞ্জ, পরে API)
      const updatedUsers = users.map((u) => 
        u._id === user._id ? { ...u, accountStatus: newStatus } : u
      );
      setUsers(updatedUsers);

      const { data } = await axiosInstance.patch(`/users/status/${user._id}`, {
        status: newStatus
      });

      if (data.success) {
        toast.success(`User ${actionText}d successfully`);
      } else {
        // ফেইল হলে আগের অবস্থায় ফেরত
        fetchUsers(); 
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${actionText.toLowerCase()} user`);
      fetchUsers(); // রিভার্ট
    }
  };

  // পেজিনেশন হ্যান্ডলার
  const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); };
  const handleNextPage = () => { if (page < totalPages) setPage(prev => prev + 1); };

  return (
    <div className="w-full bg-gray-50 p-4 min-h-screen">
      <TitleGenerate title={"User Management"} subtitle={"Manage all registered users, roles & status"} />

      {/* সার্চ বার */}
      <div className="mb-6 flex justify-end">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>
      </div>

      {/* লোডিং বা ডাটা না থাকলে */}
      {loading && users?.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : users?.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">No users found.</div>
      ) : (
        <>
          {/* --- ডেস্কটপ টেবিল --- */}
          <div className="hidden md:block overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4">User</th>
                  <th>Role</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user?._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-indigo-100 text-indigo-600 mask mask-squircle w-12 h-12 flex items-center justify-center text-xl font-bold shadow-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-sm font-medium ${
                        user.role === 'admin' ? 'badge-primary text-white' : 'badge-ghost text-gray-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className={`badge badge-sm gap-1 ${
                        user.subscription?.tier === 'premium' || user.plan === 'pro' 
                        ? 'badge-warning text-yellow-800 bg-yellow-100' 
                        : 'badge-outline text-gray-500'
                      }`}>
                        {user.subscription?.tier || user.plan || 'free'}
                      </div>
                    </td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.accountStatus === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          user.accountStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        {user.accountStatus || 'active'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* Status Toggle Button */}
                        <button 
                          onClick={() => handleStatusToggle(user)}
                          className={`btn btn-circle btn-sm border-none ${
                            user.accountStatus === 'active' 
                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title={user.accountStatus === 'active' ? "Suspend User" : "Activate User"}
                        >
                          {user.accountStatus === 'active' ? <HiBan className="text-lg" /> : <HiCheckCircle className="text-lg" />}
                        </button>

                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(user._id)} 
                          className="btn btn-circle btn-sm bg-gray-50 text-gray-500 border-none hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete User"
                        >
                          <HiTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- মোবাইল কার্ড ভিউ --- */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {users.map((user) => (
              <div key={user._id} className="card bg-white shadow-md border border-gray-100 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{user.name}</h3>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className={`badge badge-sm ${
                    user.accountStatus === 'active' ? 'badge-success text-white' : 'badge-error text-white'
                  }`}>
                    {user.accountStatus}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-sm text-gray-600 border-t border-gray-100 pt-3">
                  <span className="badge badge-ghost badge-sm">{user.role}</span>
                  <span className="font-medium capitalize text-indigo-600">
                    {user.plan || 'Free'} Plan
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleStatusToggle(user)}
                    className={`btn btn-sm w-full ${
                      user.accountStatus === 'active' ? 'btn-warning btn-outline' : 'btn-success btn-outline'
                    }`}
                  >
                    {user.accountStatus === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="btn btn-sm btn-error btn-outline w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* পেজিনেশন */}
          <div className="mt-8 flex justify-center">
            <div className="join shadow-sm">
              <button 
                className="join-item btn bg-white text-gray-600 border-gray-200 hover:bg-gray-50 disabled:bg-gray-50" 
                onClick={handlePrevPage} 
                disabled={page === 1}
              >
                «
              </button>
              <button className="join-item btn bg-white text-gray-800 border-gray-200 pointer-events-none font-bold">
                Page {page} of {totalPages}
              </button>
              <button 
                className="join-item btn bg-white text-gray-600 border-gray-200 hover:bg-gray-50 disabled:bg-gray-50" 
                onClick={handleNextPage} 
                disabled={page === totalPages}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;