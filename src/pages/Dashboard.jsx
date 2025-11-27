import React, { useEffect, useState } from 'react';
import { HiBookOpen, HiUsers, HiCurrencyDollar, HiTrendingUp } from "react-icons/hi";
import TitleGenerate from '../hooks/TitleGenerate';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalProUsers: 0,
    recentBooks: [],
    recentUsers: []
  });
  console.log(stats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get('/stats/dashboard');
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <TitleGenerate title="Dashboard Overview" subtitle="Welcome back, Admin!" />
      
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Total Books */}
        <div className="card bg-white shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full">
              <HiBookOpen className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Books</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalBooks}</h3>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="card bg-white shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-100 text-green-600 rounded-full">
              <HiUsers className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="card bg-white shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full">
              <HiCurrencyDollar className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">${stats.totalRevenue}</h3>
            </div>
          </div>
        </div>

        {/* Pro Members (Replacing 'Growth') */}
        <div className="card bg-white shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-pink-100 text-pink-600 rounded-full">
              <HiTrendingUp className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Pro Members</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalProUsers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- Recent Activity Section --- */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Books Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">Recently Added Books</h3>
            <Link to="/book-mannagement" className="text-sm text-indigo-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th>Book Title</th>
                  <th>Category</th>
                  <th>Added On</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBooks.length > 0 ? (
                  stats.recentBooks.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-10 h-10">
                              <img src={book.cover_image || "https://placehold.co/100"} alt="Book cover" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm truncate max-w-[150px]">{book.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">{book.category}</span>
                      </td>
                      <td className="text-xs text-gray-500">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No books added yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">New Joiners</h3>
            <Link to="/users" className="text-sm text-indigo-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.length > 0 ? (
                  stats.recentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-indigo-100 text-indigo-600 mask mask-circle w-10 h-10 flex items-center justify-center font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{user.name}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${user.plan === 'pro' ? 'badge-primary' : 'badge-ghost'}`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;