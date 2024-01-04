import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import './QuestionList.css';
import 'react-toastify/dist/ReactToastify.css';
import { ScoreFilter, NameFilter, TotalScoreFilter } from 'ag-grid-react';


const QuizScore = () => {
  const [quizscore, setQuizScore] = useState([]);

  useEffect(() => {
    const fetchQuizScore = async () => {
      try {
        const response = await axios.get('http://localhost:8080/quiz/allQuizScore');
        setQuizScore(response.data);
      } catch (error) {
        console.error('Error fetching quizscore:', error);
      }
    };

    fetchQuizScore();
  }, []);

  
  const columnDefs = [
    { headerName: 'S.no', field: 'id', width: 80 },
    { headerName: 'Name', field: 'name', width: 200, filter: 'NameFilter' },
    { headerName: 'Score', field: 'score', width: 150, filter: 'ScoreFilter' },
    { headerName: 'Total Score', field: 'total_score', width: 150, filter: 'TotalScoreFilter' },

    {
      headerName: 'Attempted On',
      field: 'attemptedOn',
      flex: 1,
      cellStyle: { whiteSpace: 'normal' }, // Enable text wrapping
      autoHeight: true, // Auto-adjust row height based on content
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '550px', width: '1000px', margin: '0 auto' }}>
      <h1 className='h1-question-list'>Quiz Score History</h1>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={quizscore}
        pagination={true}
        paginationPageSize={20}
        frameworkComponents={{
          ScoreFilter: ScoreFilter,
          NameFilter: NameFilter,
          TotalScoreFilter: TotalScoreFilter
        }}
      />
    </div>
  );
};

export default QuizScore;
