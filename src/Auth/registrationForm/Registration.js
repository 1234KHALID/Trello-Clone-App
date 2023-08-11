import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://long-gray-squid-vest.cyclic.cloud/registerTest', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsLoading(false);
        setApiResponse(data?.message);
        localStorage.setItem("token", data?.code);
        setTimeout(() => {
          navigate('/login');
        }, 5000)
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <div className='registration-form'>
      {apiResponse && (
        <div className="api-response">
          <p>{apiResponse}</p>
        </div>
      )}

      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usename">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={isShow ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <span className='shp' onClick={() => setIsShow(!isShow)}>{isShow ? "Hide Password" : "Show Password"}</span>
          <br />
          <br />

        </div>
        <button type="submit">{isLoading ? "Please wait..." : "Register"}</button>
        <br />
        <span>Already have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  );
};

export default Registration;
