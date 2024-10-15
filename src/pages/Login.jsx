import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(false);

    const { username, password } = formData;
    const branchName = localStorage.getItem("selectedBranch"); // Retrieve branch name from local storage

    // Simulating authentication with a delay
    setTimeout(() => {
      // Compare with local storage values based on branch
      if (username === branchName && password === branchName) {
        localStorage.setItem("isLoggedIn", "true"); // Set login state
        navigate("/home"); // Navigate to home
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1000); // 1 second delay
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-4 rounded-md px-6 py-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      {loading && <Loader />}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onLogin}>
          {error && (
            <div className="text-red-500 ml-20 font-bold">
              Invalid Username or Password
            </div>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-3"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-3"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:border hover:border-primary hover:bg-white hover:text-primary"
            >
              Sign in
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              Don't have an account? <a className="text-primary">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
