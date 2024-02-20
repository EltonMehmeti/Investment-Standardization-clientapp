import React, { useEffect, useState } from 'react'
import SidebarComponent from './Sidebar'
import axios from 'axios';
import { useParams } from 'react-router';

const Task = () => {
     const { id } = useParams();
    const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/task/${id}/`);
        setTaskDetails(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  return (
    <div>
      {taskDetails ? (
        <div>
          <p>Task ID: {taskDetails.task_id}</p>
          <p>Status: {taskDetails.status}</p>
          <p>Result: {taskDetails.result}</p>
          <p>Date Done: {taskDetails.date_done}</p>
          <p>Task Args: {taskDetails.task_kwargs}</p>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};
export default Task