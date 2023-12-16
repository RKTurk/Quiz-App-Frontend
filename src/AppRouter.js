// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import 'Routes' instead of 'Switch'
import QuestionList from './QuestionList';
import AddQuestion from './AddQuestion';
import Home from './Home';
import Layout from './Layout'; // Adjust the path as needed
import NavBar from './NavBar'; // Import the NavBar component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRouter = () => {
  return (
    <Router>
     <Layout>
        <ToastContainer />
        <NavBar /> {/* Include the NavBar component */}
        <Routes> {/* Use 'Routes' instead of 'Switch' */}
          <Route path="/" element={<Home />} />
          <Route path="/questionlist" element={<QuestionList />} /> 
          <Route path="/addquestion" element={<AddQuestion />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
