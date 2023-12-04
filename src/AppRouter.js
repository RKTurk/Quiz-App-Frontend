// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import 'Routes' instead of 'Switch'
import QuestionList from './QuestionList';
import NavBar from './NavBar'; // Import the NavBar component

const AppRouter = () => {
  return (
    <Router>
      <NavBar /> {/* Include the NavBar component */}
      <Routes> {/* Use 'Routes' instead of 'Switch' */}
        <Route path="/questionlist" element={<QuestionList />} /> {/* Use 'element' instead of 'component' */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
