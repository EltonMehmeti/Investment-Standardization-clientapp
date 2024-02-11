import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarComponent from './Sidebar';

const Synchronizer = () => {
  const [tradeFile, setTradeFile] = useState(null);
  const [cashflowFile, setCashflowFile] = useState(null);

  const [tradeColumns, setTradeColumns] = useState([]);
  const [cashFlowColumns, setCashFlowColumns] = useState([]);

  const [selectedTradeColumns, setSelectedTradeColumns] = useState({});
  const [selectedCashFlowColumns, setSelectedCashFlowColumns] = useState({});

  const cashFlow = ["identifier", "trade_identifier", "amount", "date", "cash_flow_type"];
  const trade = ["identifier", "issue_date", "maturity_date", "invested_amount", "interest_rate"];
  const [tradeColumnToReplace,setTradeColumnToReplace] = useState("") 
  const [cashflowColumnToReplace,setCashflowColumnToReplace] = useState("") 
  const [tradeValue,setTradeValue ] = useState("")
  const [cashflowValue,setCashflowValue ] = useState("")
  const [tradeConditions, setTradeConditions] = useState([
    {
      column_name: '',
      operator: '==',
      value: ''
    }
  ]);

  const [cashFlowConditions, setCashFlowConditions] = useState([
    {
      column_name: '',
      operator: '==',
      value: ''
    }
  ]);

  const [tradeOperator, setTradeOperator] = useState('&');
  const [cashFlowOperator, setCashFlowOperator] = useState('&');

  const handleChange = (index, key, value, type) => {
    if (type === 'trade') {
      const newTradeConditions = [...tradeConditions];
      newTradeConditions[index][key] = value;
      setTradeConditions(newTradeConditions);
    } else if (type === 'cashflow') {
      const newCashFlowConditions = [...cashFlowConditions];
      newCashFlowConditions[index][key] = value;
      setCashFlowConditions(newCashFlowConditions);
    }
  };

  const handleAddCondition = (type) => {
    if (type === 'trade') {
      setTradeConditions([
        ...tradeConditions,
        {
          column_name: '',
          operator: '==',
          value: ''
        }
      ]);
    } else if (type === 'cashflow') {
      setCashFlowConditions([
        ...cashFlowConditions,
        {
          column_name: '',
          operator: '==',
          value: ''
        }
      ]);
    }
  };
  

  const handleRemoveCondition = (index, type) => {
    if (type === 'trade') {
      const newTradeConditions = [...tradeConditions];
      newTradeConditions.splice(index, 1);
      setTradeConditions(newTradeConditions);
    } else if (type === 'cashflow') {
      const newCashFlowConditions = [...cashFlowConditions];
      newCashFlowConditions.splice(index, 1);
      setCashFlowConditions(newCashFlowConditions);
    }
  };
  const tradeValuesToReplace =[
    {
      column_name:tradeColumnToReplace,
    operator: tradeOperator,
    value:tradeValue,
    condition: tradeConditions
  }

  ]
  const cashflowValuesToReplace = [
    {
      column_name:cashflowColumnToReplace,
      operator: cashFlowOperator,
      value:cashflowValue,
      condition: cashFlowConditions
    }
  ]
  const handleSubmit2 = () => {
    const data = {
      trade: tradeValuesToReplace,

      cash_flow:cashflowValuesToReplace
    
    };

    console.log(data);
    return data
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('trades_file', tradeFile);
    formData.append('cashflows_file', cashflowFile);
    formData.append('column_mapping', JSON.stringify({
      trade: selectedTradeColumns,
      cash_flow: selectedCashFlowColumns
    }));
    formData.append('values_to_replace', JSON.stringify({
      trade: tradeValuesToReplace,
      cash_flow: cashflowValuesToReplace
    }));
    formData.append('merge_columns', null);
  
    axios.post("http://localhost:8000/synchronize", formData)
      .then(response => {
        console.log('Sync response:', response.data);
      })
      .catch(error => {
        console.error('Error synchronizing:', error);
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
  return (
    <div className='h-screen flex flex-row gap-20 '>
      <SidebarComponent/>
      <form onSubmit={handleSubmit} className='p-10'>
        <div className='flex flex-row gap-10'>
          <div>
            <h2>Select Trade File</h2>
            <input type="file" onChange={(e) => handleFileChange(e, 'trade')} />
          </div>
          <div>
            <h2>Select Cash Flow File</h2>
            <input type="file" onChange={(e) => handleFileChange(e, 'cashflow')} />
          </div>
        </div>
        <div className='flex flex-row justify-center items-center gap-20 p-10'>
          <div>
            <h2>Map Trade Columns</h2>
            {trade.map((tradeColumn, index) => (
              <div key={index}>
                <h3>{tradeColumn}</h3>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={tradeColumn} onChange={handleTradeColumnChange}>
                  {tradeColumns.map((column, index) => (
                    <option key={index} value={column}>{column}</option>
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
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={cashFlowColumn} onChange={handleCashFlowColumnChange}>
                  {cashFlowColumns.map((column, index) => (
                    <option key={index} value={column}>{column}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Sync Columns</button>
      </form>
      <div className='p-20'>
      <h2>Trade Conditions</h2>
      <select
            value={cashflowColumnToReplace}
            onChange={(e) => setTradeColumnToReplace(e.target.value)}
          >
            <option>Column Name</option>
            {tradeColumns.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </select> assign value <input type='text' onChange={(e)=>{setTradeValue(e.target.value)}}></input>
<h1>If</h1>
      <select value={tradeOperator} onChange={(e) => setTradeOperator(e.target.value)}>
        <option value="&">&</option>
        <option value="||">||</option>
      </select>
      {tradeConditions.map((condition, index) => (
        <div key={index}>
          <select
            value={condition.column_name}
            onChange={(e) => handleChange(index, 'column_name', e.target.value, 'trade')}
          >
            {tradeColumns.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </select>
          <select
            value={condition.operator}
            onChange={(e) => handleChange(index, 'operator', e.target.value, 'trade')}
          >
            <option value="==">==</option>
            <option value="<">&#60;</option>
            <option value=">">&#62;</option>
          </select>
          <input
            type="text"
            value={condition.value}
            onChange={(e) => handleChange(index, 'value', e.target.value, 'trade')}
            placeholder="Value"
          />
          {tradeConditions.length > 1 && (
            <button onClick={() => handleRemoveCondition(index, 'trade')}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={() => handleAddCondition('trade')}>Add Condition</button>

      <h2>Cash Flow Conditions</h2>
      <select
            value={cashflowColumnToReplace}
            onChange={(e) => setCashflowColumnToReplace(e.target.value)}
          >
            <option>Column Name</option>
            {cashFlowColumns.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </select> assign value <input type='text' onChange={(e)=>{setCashflowValue(e.target.value)}}></input>
<h1>If</h1>
      <select value={cashFlowOperator} onChange={(e) => setCashFlowOperator(e.target.value)}>
        <option value="&">&</option>
        <option value="||">||</option>
      </select>
      {cashFlowConditions.map((condition, index) => (
        <div key={index}>
          <select
            value={condition.column_name}
            onChange={(e) => handleChange(index, 'column_name', e.target.value, 'cashflow')}
          >
            {cashFlowColumns.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </select>
          <select
            value={condition.operator}
            onChange={(e) => handleChange(index, 'operator', e.target.value, 'cashflow')}
          >
            <option value="==">==</option>
            <option value="<">&#60;</option>
            <option value=">">&#62;</option>
          </select>
          <input
            type="text"
            value={condition.value}
            onChange={(e) => handleChange(index, 'value', e.target.value, 'cashflow')}
            placeholder="Value"
          />
          {cashFlowConditions.length > 1 && (
            <button onClick={() => handleRemoveCondition(index, 'cashflow')}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={() => handleAddCondition('cashflow')}>Add Condition</button>

      <button onClick={handleSubmit2}>Submit</button>
    </div>
    </div>
  );
};

export default Synchronizer;
