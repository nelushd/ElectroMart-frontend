// src/user/Signup.jsx
import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send request to backend
    console.log("Registering user:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input name="firstName" placeholder="First Name" className="w-full p-2 border mb-2" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" className="w-full p-2 border mb-2" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" className="w-full p-2 border mb-2" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" className="w-full p-2 border mb-2" onChange={handleChange} required />
      <input name="address" placeholder="Address" className="w-full p-2 border mb-2" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" className="w-full p-2 border mb-4" onChange={handleChange} required />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Signup</button>
    </form>
  );
}
