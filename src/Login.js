import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    // Implement API call to the backend for authentication
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token === 'user_found') {
      alert("Login Successful"); // Assuming the backend sends a token upon successful login
      navigate('/dashboard'); // Replace '/dashboard' with your desired route
    } else {
      alert("Invalid Credentials"); 
    }
  };

  return (
    <div className='modal-content'>
    <form>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </form> 
    </div>
  );
};

export default Login;
