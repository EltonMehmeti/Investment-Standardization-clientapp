import React, { useState } from 'react';
import axios from 'axios';

const InsertCashflows = () => {
  const [file, setFile] = useState(null);
  const [tradeColumns, setTradeColumns] = useState([]);
  const [userInputValues, setUserInputValues] = useState({
    operation: "",
    timestamp: "",
    amount: "",
    trade_identifier: "",
    platform_transaction_id: "",

  });

  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const formDataTrade = new FormData();
      formDataTrade.append('cashflows', selectedFile);

      const response = await axios.post("http://127.0.0.1:8000/investment_management/cashflow_columns/", formDataTrade);
      console.log("Response:", response);
      setTradeColumns(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInputValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }
  const handleTradeInsert = async () => {
    try {
      const formData = new FormData();
      formData.append('cash_flows', file);
      const tradeMappingJSON = JSON.stringify(userInputValues);
      formData.append('cashflow_mapping',tradeMappingJSON)
        console.log(formData);
      console.log("Request Payload:", formData);  // Log the request payload

      const response = await axios.post("http://127.0.0.1:8000/investment_management/cashflow_mapping/", formData);
        console.log(formData);

    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  

  return (
    <div className='h-screen bg-[#130b35] text-white p-8'>
      <h1 className="text-3xl font-bold text-white">Cashflow Mapping</h1>
      <div>
        <label htmlFor="fileInput">Select File:</label>
        <input className="bg-gray-50 border w-1/5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="file" id="fileInput" onChange={handleFileChange} />
      </div>
      <div className='flex flex-row gap-2 justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-1/2'>
          <label>Trade Mapping:</label>
          {Object.keys(userInputValues).map((key) => (
            <div key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id={key}
                name={key}
                value={userInputValues[key]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 m-2"
            onClick={handleTradeInsert}
          >
            Insert Cashflows
          </button>
        </div>
        <div className='flex flex-col justify-center items-center p-4 w-1/2'>
          <h2 className="mb-2 text-lg font-semibold dark:text-white">Your trade columns:</h2>
          <ul className="max-w-md space-y-1 text-gray-500 max-h-80 overflow-y-scroll list-disc list-inside dark:text-gray-400">
            {tradeColumns?.map((trade, i) => (
              <li key={i}>{trade}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InsertCashflows;
