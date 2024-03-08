'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    education: '',
  });
  const router = useRouter();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [error, setError] = useState(' ');
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [name1, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [education, setEducation] = useState('');

  const handleSubmit = async (event) => {
    const { name, value } = event.target;

    console.log('Checking user');
    event.preventDefault();
    console.log(1);

    const apiUrl = 'http://localhost:3000/api/sign_up';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      let u_id = data.userId;
      let message = data.message;
      console.log(u_id);

      if (message === 'User created successfully') {
        console.log('Form submitted successfully!');
        secureLocalStorage.setItem('u_email', email);
        secureLocalStorage.setItem('u_name', name1);
        secureLocalStorage.setItem('u_id', u_id);

        window.location.href = 'http://localhost:3000';
      } else if (message === 'User already exists') {
        setError('User already exists');
        setIsErrorOccured(true);
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign up for a new account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-gray-700"
            >
              Educational Status
            </label>
            <input
              id="education"
              name="education"
              type="text"
              required
              value={formData.education}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already a member?{' '}
          <a
            href="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}