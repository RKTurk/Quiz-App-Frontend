import React, { useState } from 'react';
import axios from 'axios';
import './CreateQuiz.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddQuestion = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    numQ: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key].trim() === '') {
        toast.warning('Please fill in all fields before submitting!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Exit early if any field is empty
      }
    }
    try {
      const response = await axios.post('http://localhost:8080/quiz/create', null, {
        params: formData,
    });
      console.log('Quiz created successfully:', response.data);
      toast.success('Quiz created successfully!', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
       // Reset the form after successful submission
      setFormData({
        category: '',
        title: '',
        numQ: '',
      });
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Some Error Occured unable to create quiz!', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className='modal-content'>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Number of Questions:
          <input type="text" name="numQ" value={formData.numQ} onChange={handleChange} />
        </label>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default AddQuestion;
