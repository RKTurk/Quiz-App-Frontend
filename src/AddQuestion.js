import React, { useState } from 'react';
import axios from 'axios';
import './AddQuestion.css';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    category: '',
    difficultyLevel: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    question: '',
    correctAnswer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/question/add', formData);
      console.log('Question added successfully:', response.data);
      alert("Question Added Successfully");
    } catch (error) {
      console.error('Error adding question:', error);
      alert("Error adding question");
    }
  };

  return (
    <div className='modal-content'>
      <h1>Add Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Difficulty Level:
          <input type="text" name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange} />
        </label>
        <label>
          Question:
        <textarea name="question" value={formData.question} onChange={handleChange} />
        </label>
        <label>
          Option 1:
          <input type="text" name="option1" value={formData.option1} onChange={handleChange} />
        </label>
        <label>
          Option 2:
          <input type="text" name="option2" value={formData.option2} onChange={handleChange} />
        </label>
        <label>
          Option 3:
          <input type="text" name="option3" value={formData.option3} onChange={handleChange} />
        </label>
        <label>
          Option 4:
          <input type="text" name="option4" value={formData.option4} onChange={handleChange} />
        </label>
        <label>
          Correct Answer:
          <input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} />
        </label>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
