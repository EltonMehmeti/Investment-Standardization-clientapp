import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const Task = () => {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/task/${id}/`);
        setTaskDetails(response.data);
        setIsLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4"> 
      {isLoading ? (
        <p className="text-center">Loading task details...</p> 
      ) : (
        taskDetails && (
          <div>
            <p className="font-bold">Task ID: {taskDetails.task_id}</p>
            <p>Status: {taskDetails.status}</p>
            <p>Result: {taskDetails.result}</p>
            <p>Date Done: {taskDetails.date_done}</p>
            <p>Task Args: {taskDetails.task_kwargs}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Task;
