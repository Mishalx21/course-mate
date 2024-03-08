import React, { use, useState } from 'react';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const UpdateProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [educationalStatus, setEducationalStatus] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
    const student_id = secureLocalStorage.getItem("u_id");

  useEffect(() => {
    async function fetchProfile() {
        const response = await fetch('http://localhost:3000/api/get_student_info', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student_id: student_id }),
        });
        const data = await response.json();
        console.log(data);
        setName(data[0][1]);
        setEmail(data[0][2]);
        setPassword(data[0][3]);
        setGender(data[0][4]);
        setDateOfBirth(data[0][5]);
        setEducationalStatus(data[0][6]);
        


    }
    fetchProfile();

  }, []);
  



  async function handleSubmit(e) {    
    e.preventDefault();
    setSubmitClicked(true);
    const response = await fetch('http://localhost:3000/api/update_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_id: student_id,
        name: name, 
        email: email, 
        password: password,
        gender:gender,
        date_of_birth:dateOfBirth,
        educational_status:educationalStatus
        
      }),
    })
    const data = await response.json();
    console.log(data);
    if (data === 1) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
    ; }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-gray-700 font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="educationalStatus" className="block text-gray-700 font-semibold mb-2">
              Educational Status
            </label>
            <select
              id="educationalStatus"
              value={educationalStatus}
              onChange={(e) => setEducationalStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Educational Status</option>
              <option value="highSchool">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            onClick={handleSubmit}  
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;