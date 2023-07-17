import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import { useState } from 'react';


function App() {
  const [name,setName] = useState("");
  const handleLogin = (loggedInName) =>{
    setName(loggedInName)
  }
  return (
    <Router> 
    <div>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin}/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home name={name} />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
);
}
export default App;
