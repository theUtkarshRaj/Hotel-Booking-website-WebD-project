import React, { useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Error from "../components/Error";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

async function loginUser(email, password, setLoading, setError) {
  const user = {
    email,
    password,
  };
  try {
    setLoading(true);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const userData = await response.json();
    setLoading(false);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    window.location.href = "/";
  } catch (error) {
    console.log(error.message);
    setLoading(false);
    setError(true);
  }
}

function Login() {
  const email = useFormInput("");
  const password = useFormInput("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleLogin() {
    loginUser(email.value, password.value, setLoading, setError);
  }

  return (
    <div className="bg-gray-200 h-screen">
      <Header />
      {loading && <Loader />}
      {error && <Error message="Invalid credentials" />}
      <div className="flex justify-center mt-5">
        <div className="flex flex-col w-1/3 sm:w-auto text-xl shadow-lg p-4 py-8 rounded-xl bg-white">
          <div className="space-y-4">
            <h1 className="font-bold text-2xl text-center">Login</h1>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              {...email}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              {...password}
            />
            <button className="btn btn-dark" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
