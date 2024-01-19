import React, { useState } from 'react';
import axios from 'axios';

const InsertTrades = () => {
  const [file, setFile] = useState(null);
  const [tradeColumns,setTradeColumns] = useState([])
  const [tradeMapping, setTradeMapping] = useState({
    identifier: "",
    issue_date: "",
    maturity_date: "",
    invested_amount: "",
    debtor_identifier: "",
    seller_identifier: "",
    interest_rate: ""
  });

  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      setFile(selectedFile); // Set the file in the state
  
      const formDataTrade = new FormData();
      formDataTrade.append('trades', selectedFile); // Use the selected file directly
  
      const response = await axios.post("http://127.0.0.1:8000/investment_management/trades_columns/", formDataTrade);
      console.log("Response:", response);
      setTradeColumns(response.data)
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  

  const handleMappingChange = (event) => {
    const { name, value } = event.target;
    setTradeMapping(prevMapping => ({
      ...prevMapping,
      [name]: value
    }));
  }

  const handleTradeInsert = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('trades_mapping',tradeMapping)
        console.log(formData);
      console.log("Request Payload:", formData);  // Log the request payload
  
      const response = await axios.post("http://127.0.0.1:8000/investment_management/trades_columns/", formData);
        console.log(formData);
  
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  return (
    <div className='h-screen bg-[#130b35] text-white p-8'>
      <h1 className="text-3xl font-bold text-white">Trade Mapping</h1>
      <div>
        <label htmlFor="fileInput">Select File:</label>
        <input className="bg-gray-50 border w-1/5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="file" id="fileInput" onChange={handleFileChange} />
      </div>
      <div className='flex flex-row gap-2 justify-center items-center'>

      <div className='flex flex-col justify-center items-center w-1/2'>
        <label>Trade Mapping:</label>
        {Object.keys(tradeMapping).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id={key} name={key} value={tradeMapping[key]} onChange={handleMappingChange} />
          </div>
        ))}
  <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 m-2" onClick={handleTradeInsert}>Insert Trades</button>
      </div>
      <div className='flex flex-col justify-center items-center p-4 w-1/2'>

      <h2 class="mb-2 text-lg font-semibold  dark:text-white">Your trade columns:</h2>
<ul class="max-w-md space-y-1 text-gray-500  max-h-80 overflow-y-scroll list-disc list-inside dark:text-gray-400">
    {tradeColumns?.map((trade,i)=>{
        return(

    <li className='text-white' key={i}>
        {trade}
    </li>
        )
    })}

</ul>

      </div>
      </div>

    </div>
  );
}

export default InsertTrades;