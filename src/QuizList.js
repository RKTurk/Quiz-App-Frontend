import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import Modal from 'react-modal'; 
import './QuizList.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const QuestionList = () => {
  const [quiz, setQuiz] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



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
        console.log(rowId);
        const response = await axios.get(`http://localhost:8080/quiz/get/${rowId}`);
        setQuestionsData(response.data);
        // Open the modal
        setIsModalOpen(true);
     
    } catch (error) {
      console.error('Error Fetching Quiz Questions:', error);
      toast.error('Some Error Occured unable to Fetch Quiz Questions!', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    }
  };
    const closeModal = () => {
        // Close the modal
        setIsModalOpen(false);
        setQuestionsData([]);
    };

    useEffect(() => {
        console.log('Questions Data:', questionsData);
    }, [questionsData]);
  
  const columnDefs = [
    { headerName: 'S.no', field: 'id', width: 100 },
    { headerName: 'Title', field: 'title', width: 200 },
    {
      headerName: 'View Quiz Questions',
      width: 200,
      cellRenderer: (params) => (
        <button className='button-quiz-list center-button' onClick={() => viewQuestions(params.data.id)}>View</button>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '550px', width: '500px', margin: '0 auto' }}>
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


    </div>
  );
};

export default QuestionList;
