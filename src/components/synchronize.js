import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarComponent from './Sidebar';
import {  Modal } from 'flowbite-react';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Synchronizer = () => {
  const [tradeFile, setTradeFile] = useState(null);
  const [cashflowFile, setCashflowFile] = useState(null);

  const [tradeColumns, setTradeColumns] = useState([]);
  const [cashFlowColumns, setCashFlowColumns] = useState([]);
  const removeSpacesFromObject = (obj) => {
    const newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = key.trim(); // Remove spaces from the key
        const value = obj[key];
        const newValue = typeof value === 'string' ? value.trim() : value; // Remove spaces from string values
        newObj[newKey] = newValue;
      }
    }
    return newObj;
  };
  const [selectedTradeColumns, setSelectedTradeColumns] = useState(removeSpacesFromObject({}));
  const [selectedCashFlowColumns, setSelectedCashFlowColumns] = useState(removeSpacesFromObject({}));

  const cashFlow = ["identifier", "trade_identifier", "amount", "date", "cash_flow_type"];
  const trade = ["identifier", "issue_date", "maturity_date", "invested_amount", "interest_rate"];
  const [tradeValuesToReplace, setTradeValuesToReplace] = useState([
    { column_name: '', operator: '', value: '', condition: [{ column_name: '', operator: '==', value: '' }] }
  ]);
  const [cashflowValuesToReplace, setCashflowValuesToReplace] = useState([
    { column_name: '', operator: '', value: '', condition: [{ column_name: '', operator: '==', value: '' }] }
  ]);
  const [tradeMergeColumns, setTradeMergeColumns] = useState([

  ])
  const [cashflowMergeColumns, setCashflowMergeColumns] = useState([
  
  ])
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const handleOpenModal = (index) => {
    setOpenModalIndex(index);
  };
  
  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };  
  const [openModalIndex2, setOpenModalIndex2] = useState(null);

  const handleOpenModal2 = (index) => {
    setOpenModalIndex2(index);
  };
  
  const handleCloseModal2 = () => {
    setOpenModalIndex2(null);
  };  
  const [openModalIndex3, setOpenModalIndex3] = useState(null);

  const handleOpenModal3 = (index) => {
    setOpenModalIndex3(index);
  };
  
  const handleCloseModal3 = () => {
    setOpenModalIndex3(null);
  };  
  const [openModalIndex4, setOpenModalIndex4] = useState(null);

  const handleOpenModal4 = (index) => {
    setOpenModalIndex4(index);
  };
  
  const handleCloseModal4 = () => {
    setOpenModalIndex4(null);
  };  
  const handleValuesToReplace = (index, key, value, type) => {
    if (type === 'trade') {
      const updatedTradeValues = [...tradeValuesToReplace];
      updatedTradeValues[index][key] = value;
      setTradeValuesToReplace(updatedTradeValues);
    } else if (type === 'cashflow') {
      const updatedCashflowValues = [...cashflowValuesToReplace];
      updatedCashflowValues[index][key] = value;
      setCashflowValuesToReplace(updatedCashflowValues);
    }
  };
  const handleMergeColumnsChange = (index, value, key, type, columnIndex) => {
    if (type === 'trade') {
      const newTradeMergeColumns = [...tradeMergeColumns];
      
      if (columnIndex !== undefined) {
        newTradeMergeColumns[index][key][columnIndex] = value;
      } else {
        newTradeMergeColumns[index][key] = value;
      }
      console.log(newTradeMergeColumns);
      setTradeMergeColumns(newTradeMergeColumns);
    } else if (type === 'cashflow') {
      const newCashflowMergeColumns = [...cashflowMergeColumns];
      if (columnIndex !== undefined) {
        newCashflowMergeColumns[index][key][columnIndex] = value;
      } else {
        newCashflowMergeColumns[index][key] = value;
      }
      console.log(newCashflowMergeColumns);
      setCashflowMergeColumns(newCashflowMergeColumns);
    }
  };
  
  const addNewValuesToReplace = (type) => {
    if (type === 'trade') {
      setTradeValuesToReplace([
        ...tradeValuesToReplace,
        { column_name: '', operator: '', value: '', condition: [{ column_name: '', operator: '==', value: '' }] }
      ]);
    } else if (type === 'cashflow') {
      setCashflowValuesToReplace([
        ...cashflowValuesToReplace,
        { column_name: '', operator: '', value: '', condition: [{ column_name: '', operator: '==', value: '' }] }
      ]);
    }
  };
  const addNewMergeColumns =(type)=>{
    if (type === 'trade') {
      setTradeMergeColumns([
        ...tradeMergeColumns,
        {
          "new_column_name": "",
          "operator": "",
          "columns_to_merge": ["", ""]
       }
      ]);
    } else if (type === 'cashflow') {
      setCashflowMergeColumns([
        ...cashflowMergeColumns,
        {
          "new_column_name": "",
          "operator": "",
          "columns_to_merge": ["", ""]
       }
      ]);
    }
  }
  
  
  const handleRemoveCondition = (index, conditionIndex, type) => {
    if (type === 'trade') {
      const newTradeValuesToReplace = [...tradeValuesToReplace];
      newTradeValuesToReplace[index] = {
        ...newTradeValuesToReplace[index],
        condition: newTradeValuesToReplace[index].condition.filter((_, i) => i !== conditionIndex),
      };
      setTradeValuesToReplace(newTradeValuesToReplace);
    } else if (type === 'cashflow') {
      const newCashflowValuesToReplace = [...cashflowValuesToReplace];
      newCashflowValuesToReplace[index] = {
        ...newCashflowValuesToReplace[index],
        condition: newCashflowValuesToReplace[index].condition.filter((_, i) => i !== conditionIndex),
      };
      setCashflowValuesToReplace(newCashflowValuesToReplace); 
    }
  };
  
  const handleRemoveValuesToReplace = (index, type) => {
    if (type === 'trade') {
      const newTradeValuesToReplace = tradeValuesToReplace.filter((_, i) => i !== index);
      setTradeValuesToReplace(newTradeValuesToReplace);
    } else if (type === 'cashflow') {
      const newCashflowValuesToReplace = cashflowValuesToReplace.filter((_, i) => i !== index);
      setCashflowValuesToReplace(newCashflowValuesToReplace);
    }
  };
  const handleRemoveMergeColumns = (index, type) => {
    if (type === 'trade') {
      const newTradeMergeColumns = tradeMergeColumns.filter((_, i) => i !== index);
      setTradeMergeColumns(newTradeMergeColumns);
    } else if (type === 'cashflow') {
      const newCashflowMergeColumns = cashflowMergeColumns.filter((_, i) => i !== index);
      setCashflowMergeColumns(newCashflowMergeColumns);
    }
  };


  
  const addNewCondition = (index, type) => {
    if (type === 'trade') {
      const updatedTradeValues = [...tradeValuesToReplace];
      updatedTradeValues[index].condition.push({ column_name: '', operator: '==', value: '' });
      setTradeValuesToReplace(updatedTradeValues);
    } else if (type === 'cashflow') {
      const updatedCashflowValues = [...cashflowValuesToReplace];
      updatedCashflowValues[index].condition.push({ column_name: '', operator: '==', value: '' });
      setCashflowValuesToReplace(updatedCashflowValues);
    }
  };
  const handleConditionChange = (dropdownIndex, conditionIndex, key, value, type) => {
    if (type === 'trade') {
      const updatedTradeValues = [...tradeValuesToReplace];
      const condition = { ...updatedTradeValues[dropdownIndex].condition[conditionIndex] };
      condition[key] = value;
      updatedTradeValues[dropdownIndex].condition[conditionIndex] = condition;
      setTradeValuesToReplace(updatedTradeValues);
 
    } else if (type === 'cashflow') {
      const updatedCashflowValues = [...cashflowValuesToReplace];
      const condition = { ...updatedCashflowValues[dropdownIndex].condition[conditionIndex] };
      condition[key] = value;
      updatedCashflowValues[dropdownIndex].condition[conditionIndex] = condition;
      setCashflowValuesToReplace(updatedCashflowValues);
    }
  };
  

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (fileType === 'trade') {
      setTradeFile(file);
    } else if (fileType === 'cashflow') {
      setCashflowFile(file);
    }
  };

  const handleTradeColumnChange = (e) => {
    const { name, value } = e.target;
    setSelectedTradeColumns(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCashFlowColumnChange = (e) => {
    const { name, value } = e.target;
    setSelectedCashFlowColumns(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const invertObject = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});
  };
  const invertedTradeColumns = invertObject(selectedTradeColumns);
const invertedCashFlowColumns = invertObject(selectedCashFlowColumns);

const handleSubmit = (e) => {
  e.preventDefault();
  const organizationId = sessionStorage.getItem('organizationId');
  const formData = new FormData();
  if (tradeFile) {
    formData.append('trades_file', tradeFile);
  }
  
  if (cashflowFile) {
    formData.append('cashflows_file', cashflowFile);
  }
  
  formData.append('column_mapping', JSON.stringify({
    trade: invertedTradeColumns,
    cash_flow: invertedCashFlowColumns
  }));
  formData.append('values_to_replace', JSON.stringify({
    trade: tradeValuesToReplace.value == 'Column Name' ? tradeValuesToReplace : null,
    cash_flow: cashflowValuesToReplace.column_name !== '' ? cashflowValuesToReplace : null
  }));
  formData.append('merge_columns', JSON.stringify({
    trade: tradeMergeColumns.new_column_name !== ''? tradeMergeColumns : null,
    cash_flow: cashflowMergeColumns.new_column_name !== '' ? cashflowMergeColumns: null 
  }));

  formData.append('organization_id', organizationId);
  axios.post("http://localhost:8000/synchronize", formData)
    .then(response => {
      toast.info(response.data.message);
      if (response.data.task_ids) {
        response.data.task_ids.forEach(task => {
          toast.info(
            <Link to={`/task/${task}`}>{task}</Link>
          );
        });
      }
    })
    .catch(error => {
      console.log(error);
      if (error.response) {
        const responseData = error.response.data;
        if (responseData && typeof responseData === 'object') {
          Object.values(responseData).forEach(value => {
            if (Array.isArray(value)) {
              value.forEach(errorMsg => {
                toast.error(errorMsg);
              });
            } else {
              toast.error(value);
            }
          });
        } else {
          toast.error(responseData.message || 'An error occurred');
        }
      } else if (error.request) {
        toast.error('No response received from the server');
        console.error('No response received from the server');
      } else {
        toast.error('An error occurred while sending the request');
        console.error('An error occurred while sending the request', error.message);
      }
    });
};

const handleSaveConfiguration = () => {
  const organizationId = sessionStorage.getItem('organizationId');
  const configName = prompt('Please enter a name for this configuration:');
  if (!configName) {
    return;
  }
  const formData = new FormData();
  if (tradeFile) {
    formData.append('trades_file', tradeFile);
  }
  if (cashflowFile) {
    formData.append('cashflows_file', cashflowFile);
  }
  formData.append('column_mapping', JSON.stringify({
    trade: selectedTradeColumns,
    cash_flow: selectedCashFlowColumns
  }));
  formData.append('values_to_replace', JSON.stringify({
    trade: tradeValuesToReplace ,
    cash_flow: cashflowValuesToReplace.column_name !== '' ? cashflowValuesToReplace : null
  }));
  formData.append('merge_columns', JSON.stringify({
    trade: tradeMergeColumns ,
    cash_flow: cashflowMergeColumns
  }));

  formData.append('organization', organizationId);
  formData.append('config_name', configName); 

  axios.post("http://localhost:8000/save-configuration", formData)
    .then(response => {
      toast.success('Configuration saved:', response.data);
    })
    .catch(error => {
      console.error('Error saving configuration:', error);
      toast.error('Failed to save configuration');
    });
};
  useEffect(() => {
    if (tradeFile) {
      const formData = new FormData();
      formData.append('file', tradeFile);

      axios.post("http://localhost:8000/columns", formData)
      .then(response => {
        setTradeColumns(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [tradeFile]);

  useEffect(() => {
    if (cashflowFile) {
      const formData = new FormData();
      formData.append('file', cashflowFile);

      axios.post("http://localhost:8000/columns", formData)
      .then(response => {
        setCashFlowColumns(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [cashflowFile]);
  const [configurations, setConfigurations] = useState([]);

  const organizationId = sessionStorage.getItem('organizationId');
  useEffect(() => {

    const fetchConfigurations = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get-configs/${organizationId}/`);
        setConfigurations(response.data);
      } catch (error) {
        console.error('Error fetching configurations:', error);
      }
    };

    fetchConfigurations();
  }, [organizationId]);



  const handleSetConfigs = (i) => {
    // setTradeFile(configurations[i].trades_file)
    // setCashflowFile(configurations[i].cashflows_file)
    if (tradeFile == null || cashflowFile ==null){
      alert('Select the files you want to synchronize for better experience!')
    }
    setSelectedTradeColumns(configurations[i].column_mapping.trade);
    setSelectedCashFlowColumns(configurations[i].column_mapping.cash_flow);
    setTradeValuesToReplace(
      configurations[i].values_to_replace.trade !== null
        ? configurations[i].values_to_replace.trade
        : [] 
    );
    setCashflowValuesToReplace(
      configurations[i].values_to_replace.cash_flow !== null
        ? configurations[i].values_to_replace.cash_flow
        : [] 
    );
    setTradeMergeColumns(
      configurations[i].merge_columns?.trade !== null
      ? configurations[i].merge_columns?.trade
      : [] 
    )
    setCashflowMergeColumns(
      configurations[i].merge_columns?.cash_flow !== null
        ? configurations[i].merge_columns?.cash_flow
        : [] 
    );
  };
  return (
    <div className='h-screen flex flex-row gap-20 '>
      <SidebarComponent/>
      <form onSubmit={handleSubmit} className='p-10'>
        <div className='flex flex-row gap-10'>
          <div>
            <h2>Select Trade File</h2>
            <input type="file"  onChange={(e) => handleFileChange(e, 'trade')} />
          </div>
          <div>
            <h2>Select Cash Flow File</h2>
            <input type="file"  onChange={(e) => handleFileChange(e, 'cashflow')} />
          </div>
        </div>
        <div className='flex flex-row justify-center items-center gap-20 p-10'>
          <div>
            <h2>Map Trade Columns</h2>
            {trade.map((tradeColumn, index) => (
  <div key={index}>
    <h3>{tradeColumn}</h3>
    <select
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={tradeColumn} onChange={handleTradeColumnChange}>
      <option>Choose</option>
      {[...new Set([...Object.values(selectedTradeColumns), ...tradeColumns])].map((column, index) => (
        <option key={index} value={column} selected={selectedTradeColumns[tradeColumn] === column}>{column}</option>
      ))}
    </select>
  </div>
))}

          </div>
          <div>
            <h2>Map Cash Flow Columns</h2>
            {cashFlow.map((cashFlowColumn, index) => (
  <div key={index}>
    <h3>{cashFlowColumn}</h3>
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={cashFlowColumn} onChange={handleCashFlowColumnChange}>
      <option>Choose</option>
      {[...new Set([...Object.values(selectedCashFlowColumns), ...cashFlowColumns])].map((column, index) => (
        <option key={index} value={column} selected={selectedCashFlowColumns[cashFlowColumn] === column}>{column}</option>
      ))}
    </select>
  </div>
))}

          </div>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Synchronize</button>
      </form>
      <div className='flex flex-col p-20 gap-5'>
        <div className='flex flex-col gap-2 max-h-[20vh] overflow-y-scroll'>

      <h2>Trade Values To Replace:</h2>

{tradeValuesToReplace?.map((value, index) => {
  const dropdownTradeConditions = value.condition || [];
  return (
    <>
      <div key={index} className='flex flex-row gap-1 items-center justify-center'>
        <span onClick={() => handleOpenModal(index)} className='text-black cursor-pointer p-2 border-2 rounded-lg'>Trade {index}</span>
        <Modal show={openModalIndex === index} onClose={handleCloseModal} className='fixed inset-0 flex items-center max-h-[60vh] justify-center'>
          <div className='bg-white p-10 rounded-lg border-2 w-2/5 overflow-y-scroll max-h-[60vh]'>
            <h1>{value.value}{index}</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={value.column_name} // Set the default selected value
              onChange={(e) => handleValuesToReplace(index, 'column_name', e.target.value, 'trade')}
            >
              <option>Column Name</option>
              {tradeColumns.map((column, columnIndex) => (
                <option key={columnIndex} value={column}>{column}</option>
              ))}
            </select>

            Assign value
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type='text'
              value={value.value}  
              onChange={(e) => handleValuesToReplace(index, 'value', e.target.value, 'trade')}
            />

            <h1>If</h1>

            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={value.operator}
              onChange={(e) => handleValuesToReplace(index , 'operator', e.target.value, 'trade')}
            >
              <option>Null</option>
              <option value="&">&</option>
              <option value="|">|</option>
            </select>

            {dropdownTradeConditions.map((condition, conditionIndex) => (
              <div key={conditionIndex} className='border-2 p-2'>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={condition.column_name}
                  onChange={(e) => handleConditionChange(index, conditionIndex, 'column_name', e.target.value, 'trade')}
                >
                  {tradeColumns.map((column, columnIndex) => (
                    <option key={columnIndex} value={column}>{column}</option>
                  ))}
                </select>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={condition.operator}
                  onChange={(e) => handleConditionChange(index, conditionIndex, 'operator', e.target.value, 'trade')}
                >
                  <option value="==">==</option>
                  <option value="<">&#60;</option>
                  <option value=">">&#62;</option>
                </select>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={condition.value}  
                  onChange={(e) => handleConditionChange(index, conditionIndex, 'value', e.target.value, 'trade')}
                  placeholder="Value"
                />
                {dropdownTradeConditions.length > 1 && (
                  <svg onClick={() => handleRemoveCondition(index, conditionIndex, 'trade')} class="w-6 h-6 cursor-pointer text-red-700 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                  </svg>
                )}
              </div>
            ))}

            <svg onClick={() => addNewCondition(index, 'trade')} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clip-rule="evenodd"/>
            </svg>
          
            <button className='border-2 bg-red-700 text-white p-2 rounded-lg'  onClick={() => handleCloseModal()}>
              Close
            </button>
          </div>
        </Modal>
        <svg onClick={() => handleRemoveValuesToReplace(index, 'trade')} class="w-6 h-6 cursor-pointer text-red-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
        </svg>
      </div>
    </>
  );
})}


  </div>
      <svg onClick={() => addNewValuesToReplace('trade')} class="w-6 h-6 cursor-pointer  text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>

    <div className='flex flex-col gap-2 max-h-[20vh] overflow-y-scroll'>

      <h2>Cash Flow Values to replace</h2>
      {cashflowValuesToReplace?.map((value, index) => {
  const dropdownTradeConditions = value.condition || []; // Conditions for this specific dropdown

  return (
<>
<div key={index} className='flex flex-row gap-1 items-center justify-center '>

<span  onClick={() => handleOpenModal2(index)} className='text-black cursor-pointer p-2 border-2 rounded-lg'>CashFlow {index}</span>
<Modal show={openModalIndex2 === index} onClose={handleCloseModal2} className='fixed inset-0 flex items-center max-h-[60vh] justify-center'>
        <div className='bg-white p-10 rounded-lg border-2 w-2/5 overflow-y-scroll max-h-[60vh] '>
          <p>{index}</p>
        <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={value.column_name}
            onChange={(e) => handleValuesToReplace(index, 'column_name', e.target.value, 'cashflow')}
          >
            <option>Column Name</option>
            {cashFlowColumns.map((column, columnIndex) => (
              <option key={columnIndex} value={column}>{column}</option>
            ))}
      </select>

      Assign value
      <input 
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  type='text'
  value={value.value}  // Correctly bind to value.value
  onChange={(e) => handleValuesToReplace(index, 'value', e.target.value, 'cashflow')}
/>


      <h1>If</h1>

      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value.operator}
        onChange={(e) => handleValuesToReplace(index , 'operator', e.target.value, 'cashflow')}
      >
        <option>Null</option>
        <option value="&">&</option>
        <option value="|">|</option>
      </select>

      {dropdownTradeConditions.map((condition, conditionIndex) => (
  <div key={conditionIndex} className='border-2 p-2'>
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={condition.column_name}
      onChange={(e) => handleConditionChange(index, conditionIndex, 'column_name', e.target.value, 'cashflow')}
    >
      {cashFlowColumns.map((column, columnIndex) => (
        <option key={columnIndex} value={column}>{column}</option>
      ))}
    </select>
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={condition.operator}
      onChange={(e) => handleConditionChange(index, conditionIndex, 'operator', e.target.value, 'cashflow')}
    >
      <option value="==">==</option>
      <option value="<">&#60;</option>
      <option value=">">&#62;</option>
    </select>
    <input
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  type="text"
  value={condition.value}  
  onChange={(e) => handleConditionChange(index, conditionIndex, 'value', e.target.value, 'cashflow')}
  placeholder="Value"
/>
    {dropdownTradeConditions.length > 1 && (
      <svg onClick={() => handleRemoveCondition(index, conditionIndex, 'cashflow')} class="w-6 h-6 cursor-pointer text-red-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
      </svg>
    )}
  </div>
))}

      <svg onClick={() => addNewCondition(index, 'cashflow')} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clip-rule="evenodd"/>
  </svg>
  
      <button className='border-2 bg-red-700 text-white p-2 rounded-lg'  onClick={() => handleCloseModal2()}>
            Close
          </button>
</div>
    </Modal>
    <svg onClick={() => handleRemoveValuesToReplace(index, 'cashflow')} class="w-6 h-6 cursor-pointer text-red-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
      </svg>
</div>

    </>
  );
})}

  </div>
     <svg onClick={() => addNewValuesToReplace('cashflow')} class="w-6 h-6 cursor-pointer  text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>

  <button
  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
  onClick={handleSaveConfiguration}
>
  Save Configuration
</button>
<div className='flex flex-col '>
  <h1>Saved Configs: </h1>
  {configurations?.map((config, i) => {
    return (
      <button class="text-white bg-orange-500 w-26 h-10 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-blue-800" key={i} onClick={() => handleSetConfigs(i)}>{config.config_name}</button>
    );
  })}
</div>

    </div>
    <div className='flex flex-col py-20'>
  <div >
    <h1>Trade Merge Columns</h1>
    {tradeMergeColumns?.map((column, index) => (
        <div key={index} className="flex items-center gap-2 gap-y-2">
          <span onClick={() => handleOpenModal3(index)} className='text-black cursor-pointer p-2 border-2 rounded-lg'>Trade {index}</span>
          <Modal show={openModalIndex3 === index} onClose={handleCloseModal3} className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center'>
            <div className='bg-white p-10 rounded-lg border-2 items-center justify-center flex '>
            <input
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  type="text"
  value={column.new_column_name}
  onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'new_column_name', 'trade')}
  onBlur={(e) => {
    const newValue = e.target.value;
    setTradeColumns([...tradeColumns, newValue]);
  }}
  placeholder="New Column Name"
/>

              <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                value={column.operator}
                onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'operator', 'trade')}
              >
                <option value="sum">Sum</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
              </select>
       
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={column.columns_to_merge[0]}
                  onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'columns_to_merge', 'trade', 0)}
                >
                  {tradeColumns.map((column, columnIndex) => (
                    <option key={columnIndex} value={column}>{column}</option>
                  ))}
                </select>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={column.columns_to_merge[1]}
                  onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'columns_to_merge', 'trade', 1)}
                >
                  {tradeColumns.map((column, columnIndex) => (
                    <option key={columnIndex} value={column}>{column}</option>
                  ))}
                </select>
          
              <button className='border-2 bg-red-700 text-white p-2 rounded-lg ml-2' onClick={handleCloseModal3}>Close</button>
            </div>
          </Modal>
          <svg onClick={() => handleRemoveMergeColumns(index, 'trade')} class="w-6 h-6 cursor-pointer text-red-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
        </svg>
         
        </div>
      ))}
    <svg onClick={() => addNewMergeColumns('trade')}class="w-6 h-6 text-gray-800 dark:text-white text-green-500 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clip-rule="evenodd"/>
  </svg>
  </div>
  <div>
  <h1>Cashflow Merge Columns</h1>
  {cashflowMergeColumns?.map((column, index) => (
    <div key={index} className="flex items-center">
      <span onClick={() => handleOpenModal4(index)} className='text-black cursor-pointer p-2 border-2 rounded-lg'>Cashflow {index}</span>
      <Modal show={openModalIndex4 === index} onClose={handleCloseModal4} className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center'>
        <div className='bg-white p-10 rounded-lg border-2 items-center justify-center flex '>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={column.new_column_name}
            onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'new_column_name', 'cashflow')}
            onBlur={(e) => {
              const newValue = e.target.value;
              setCashFlowColumns([...cashFlowColumns, newValue]);
            }}
            placeholder="New Column Name"
          />
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={column.operator}
            onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'operator', 'cashflow')}
          >
            <option value="sum">Sum</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
          </select>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={column.columns_to_merge[0]}
            onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'columns_to_merge', 'cashflow', 0)}
          >
            {cashFlowColumns.map((column, columnIndex) => (
              <option key={columnIndex} value={column}>{column}</option>
            ))}
          </select>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={column.columns_to_merge[1]}
            onChange={(e) => handleMergeColumnsChange(index, e.target.value, 'columns_to_merge', 'cashflow', 1)}
          >
            {cashFlowColumns.map((column, columnIndex) => (
              <option key={columnIndex} value={column}>{column}</option>
            ))}
          </select>
          <button className='border-2 bg-red-700 text-white p-2 rounded-lg ml-2' onClick={handleCloseModal4}>Close</button>
        </div>
      </Modal>
      <svg onClick={() => handleRemoveMergeColumns(index, 'cashflow')} class="w-6 h-6 cursor-pointer text-red-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
      </svg>
    </div>
  ))}
  <svg onClick={() => addNewMergeColumns('cashflow')} class="w-6 h-6  dark:text-white text-green-500 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clip-rule="evenodd"/>
  </svg>
  </div>
<ToastContainer/>

</div>
    </div>
  );
};

export default Synchronizer;
