import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
const Login = ({ setAPIData }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isShow, setIsShow] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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
      const response = await fetch('https://long-gray-squid-vest.cyclic.cloud/loginTest', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
          'Authorization': token,
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setApiResponse(data);
      if (data?.code) {
        setIsLoading(false);
        localStorage.setItem('accessToken', data?.accessToken)
        setAPIData(data?.chatUsername)
        navigate('/board');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-form'>
      {apiResponse && (
        <div className="api-response">
          <p>{apiResponse?.message}</p>
        </div>
      )}

      <h2>Login Form</h2>
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
        </div>
        <span className='shp1' onClick={() => setIsShow(!isShow)}>{isShow ? "Hide password" : "Show Password"}</span>
        <br />
        <br />
        <button type="submit">{isLoading ? "Please wait..." : "Login Now"}</button>
        <br />
        <span>Not Registered? <Link to='/'>Create Account</Link></span>
      </form>
    </div>
  );
};

export default Login;
