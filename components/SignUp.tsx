"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
            const errorResponse = await res.text(); // Use text() instead of json() for non-JSON responses
            throw new Error(errorResponse || 'An unknown error occurred');
       }
        const data = await res.json();
        console.log('User created:', data);
        router.push('/api/auth/signin');
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred'; //for debugginh
        console.error('Error occurred during signup:', errorMsg); //for debugging
        setError('An error occurred during signup');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-5">Sign up</h1>
      <p className="text-center mb-4">Please enter your details.</p>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: John"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: Doe"
              required
            />
          </div>
        </div>
        <div>
          <label className="block">Address</label>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your specific address"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block">city</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-slate-950 rounded"
              placeholder="ex: NY"
            />
          </div>
          <div className="flex-1">
            <label className="block">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: 11101"
              required
            />
          </div>
        </div>
        <div>
          <label className="block">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block">SSN</label>
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="ex: 1234"
            required
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign up
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <a href="api/auth/signin" className="text-blue-500">Login</a>
      </p>
    </div>
  );
}
