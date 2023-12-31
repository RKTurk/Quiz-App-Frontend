import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import Modal from 'react-modal'; 
import './QuizList.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizList = ({ loggedInUser }) => {
  const [quiz, setQuiz] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttemptModalOpen, setIsAttemptModalOpen] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState({});
  const [rowID, setRowID] = useState('');  // Use state hook for rowID

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/quiz/allQuiz');
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const viewQuestions = async (rowId) => {
    try {
      const response = await axios.get(`http://localhost:8080/quiz/get/${rowId}`);
      setQuestionsData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error Fetching Quiz Questions:', error);
      toast.error('Some Error Occured unable to Fetch Quiz Questions!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const attemptQuestions = async (rowId) => {
    try {
      const response = await axios.get(`http://localhost:8080/quiz/get/${rowId}`);
      setQuestionsData(response.data);
      setRowID(rowId);  // Update rowID using setRowID
      setIsAttemptModalOpen(true);
    } catch (error) {
      console.error('Error Attempting Quiz:', error);
      toast.error('Some Error Occured unable to Attempt Quiz!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const closeAttemptModal = () => {
    setIsAttemptModalOpen(false);
    setQuestionsData([]);
    setSelectedResponses({});
    setRowID('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuestionsData([]);
  };

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:8080/quiz/submit/${rowID}?username=${loggedInUser.username}`;
    // Check if all questions have responses
     const hasEmptyResponse = questionsData.some((question) => !selectedResponses[question.id]);

     if (hasEmptyResponse) {
       // Display toaster warning and return without submitting
       toast.warning('Please answer all questions before submitting!', {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
       });
       return;
     }
    const requestData = questionsData.map((question) => ({
      id: question.id,
      response: selectedResponses[question.id],
    }));

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };

    try {
      const response = await axios.post(apiUrl, requestData, requestOptions);
      console.log('Quiz Submitted score is:', response);
      toast.success('Quiz Submitted and your Total Score is: '+response.data, {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeAttemptModal();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Some Error Occurred while submitting the quiz!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const columnDefs = [
    { headerName: 'S.no', field: 'id', width: 100 },
    { headerName: 'Title', field: 'title', width: 200 },
    {
      headerName: 'View Quiz Questions',
      width: 200,
      cellRenderer: (params) => (
        <button className='button-quiz-list center-button' onClick={() => viewQuestions(params.data.id)}>
          View
        </button>
      ),
    },
    {
      headerName: 'Attempt Quiz',
      width: 200,
      cellRenderer: (params) => (
        <button className='button-attempt-quiz-list center-button' onClick={() => attemptQuestions(params.data.id)}>
          Attempt Quiz
        </button>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '550px', width: '700px', margin: '0 auto' }}>
      <h1 className='h1-quiz-list'>Quiz List</h1>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={quiz}
        pagination={true}
        paginationPageSize={20}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal-content'
        overlayClassName='modal-overlay'
      >
        <h2 style={{ textAlign: 'center', margin: '0 auto' }}>Quiz Questions</h2>
        <ol>
          {questionsData.map((question, index) => (
            <li key={index}>{question.question}</li>
          ))}
        </ol>
        <button onClick={closeModal}>Close</button>
      </Modal>
      <Modal
        isOpen={isAttemptModalOpen}
        onRequestClose={closeAttemptModal}
        className='modal-attempt-content'
        overlayClassName='modal-attempt-overlay'
      >
        <h2 style={{ textAlign: 'center', margin: '0 auto' }}>Attempt Quiz</h2>
        <form>
          <ol>
            {questionsData.map((question, index) => (
              <li key={index}>
                <p>{question.question}</p>
                <ul>
                  {Object.keys(question).map((key) => {
                    if (key.startsWith('option')) {
                      return (
                        <li key={key}>
                          <label>
                            <input
                              type='radio'
                              name={`question_${question.id}`}
                              value={question[key]}
                              onChange={() => setSelectedResponses((prevResponses) => ({
                                ...prevResponses,
                                [question.id]: question[key],
                              }))}
                            />
                            {question[key]}
                          </label>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </li>
            ))}
          </ol>
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={closeAttemptModal}
              style={{ marginRight: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{ backgroundColor: 'green', color: 'white' }}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default QuizList;
