// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/questionlist">Question List</Link>
        </li>
        <li>
          <Link to="/addquestion">Add Question</Link>
        </li>
        <li>
          <Link to="/quizlist">Quiz List</Link>
        </li>
        <li>
          <Link to="/createquiz">Create Quiz</Link>
        </li>
        <li>
          <Link to="/quizscore">View Quiz Score</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
