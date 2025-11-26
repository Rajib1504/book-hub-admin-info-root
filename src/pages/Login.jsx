import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const onsubmit = async (data) => {
    setIsLoggingIn(true);

    const success = await login(data.email, data.password);
    if (success) {
      navigate("/");
    }
    setIsLoggingIn(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onsubmit)}
        noValidate
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Admin Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@gmail.com"
            className="w-full rounded-md border border-gray-300 p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="w-full rounded-md border border-gray-300 p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="mt-1 block text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <input
          type="submit"
          disabled={isLoggingIn}
          value={isLoggingIn ? "Logging in..." : "Login"}
          className={`w-full cursor-pointer rounded-md bg-blue-600 p-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoggingIn ? "opacity-70 cursor-not-allowed" : ""
          }`}
        />
      </form>
    </div>
  );
};

export default Login;
