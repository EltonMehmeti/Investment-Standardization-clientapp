import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDrop } from 'react-dnd';
import ColumnTitle from './ColumnTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'flowbite-react';
const InsertTrades = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message,setMessage] = useState("")
  const [file, setFile] = useState(null);
  const [tradeColumns, setTradeColumns] = useState([]);
  const [userInputValues, setUserInputValues] = useState({
    identifier: "",
    issue_date: "",
    maturity_date: "",
    invested_amount: "",
    debtor_identifier: "",
    seller_identifier: "",
    interest_rate: ""
  });
const [keys,setKeys] = useState(
 [
   "identifier",
    "issue_date",
    "maturity_date",
    "invested_amount",
    "debtor_identifier",
    "seller_identifier",
    "interest_rate",
  ]
)
const [values, setvalues] = useState([]);

  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const formDataTrade = new FormData();
      formDataTrade.append('trades', selectedFile);

      const response = await axios.post("http://127.0.0.1:8000/investment_management/trades_columns/", formDataTrade);
      console.log("Response:", response);
      setTradeColumns(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
const handleResetValues = ()=>{
setvalues([])
}


  const addColumn = (tradeC) => {
    setvalues((prevvalues) => [...prevvalues, tradeC]);
  };

  const [, drop] = useDrop(() => ({
    accept: "column",
    drop: (item) => addColumn(item.title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  useEffect(()=>{
    if(values.length>keys.length){
      alert("You can't add more!")
    }
    },[values])

  const resultObject = {};
  keys.forEach((key, index) => {
    resultObject[key] = values[index];
  });
  const handleTradeInsert = async () => {
    try {
      // Display the first message
      setMessage("Reading trades file...");
      toast.info("Reading trades file...");

      const formData = new FormData();
      formData.append('trades', file);

      console.log(resultObject);
      if (values.length < keys.length) {
        setMessage("You need to add all the fields?");
        toast.info("You need to add all the fields?");
        return;
      }

      const tradeMappingJSON = JSON.stringify(resultObject);
      formData.append('trade_mapping', tradeMappingJSON);
      console.log("Request Payload:", formData);

      // Simulate a delay for each message
      const messageDelay = 2000;

      setTimeout(() => {
        setMessage("Processing trades file...");
        toast.info("Processing trades file...");
      }, messageDelay);

      setTimeout(async () => {
        try {
          const response = await axios.post("http://127.0.0.1:8000/investment_management/mapping-fields/", formData);
          console.log(response);

          if (response.status === 200) {
            setMessage("Trades file processed and inserted successfully");
            toast.info("Trades file processed and inserted successfully");
          } else {
            console.error("Server error:", response.statusText);
            setMessage("An error occurred while processing the trades file.");
            toast.info("An error occurred while processing the trades file.");
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage("An unexpected error occurred.");
          toast.info("An unexpected error occurred.");
        }
      }, messageDelay * 2); 

    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred.");
      toast.info("An unexpected error occurred.");
    }
  };
  


  return (
    <div className='h-screen bg-[#130b35] text-white p-8'>
      <h1 className="text-3xl font-bold text-white">Trade Mapping</h1>
      <div className='flex flex-row justify-between items-center w-full'>

      <div className='w-1/2'>
        <label htmlFor="fileInput">Select File:</label>
        <input className="bg-gray-50 border w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="file" id="fileInput" onChange={handleFileChange} />
      </div>
      <div className='w-1/2 flex flex-row gap-8'>
      <svg className=' cursor-pointer' onClick={handleResetValues} xmlns="http://www.w3.org/2000/svg" fill='white'  width={30} viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>

      <button type="button" class="focus:outline-none text-white bg-yellow-400
       hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm 
       px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={handleTradeInsert}>Submit</button>

<button onClick={() => setOpenModal(true)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
       focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
       dark:hover:bg-green-700 dark:focus:ring-green-800">Data</button>
      </div>
      </div>
      <div className='flex flex-row gap-2 justify-center h-full items-center'>

        <div className='flex flex-row p-4 justify-center items-center w-1/2'>
        
          <div className='flex flex-col rounded-l-xl bg-white  '>
   

          {keys.map((key) => (

              
              <label 
                className="text-black  p-[13px] flex flex-row  border-b-2 justify-between m-[5px]"
              htmlFor={key}>{key}:</label>
             
          ))}
          </div>
           <div className="values bg-slate-900 w-auto min-w-60 min-h-[27rem] rounded-r-xl h-auto" ref={drop}>
       
        {values.map((column, i) => (
          
          <ColumnTitle key={i} title={column} />
        ))}
        
      </div>

        </div>
     
        <div className='flex flex-col justify-center items-center p-4 w-1/2'>
          <h2 className="mb-2 text-lg font-semibold dark:text-white">Your trade columns:</h2>
          <ul className="max-w-md space-y-1 text-gray-500 max-h-80 overflow-y-scroll list-disc list-inside dark:text-gray-400">
            {tradeColumns?.map((trade, i) => (
              <>
              <ColumnTitle key={i} title={trade} />
              </>
            ))}
          </ul>
        </div>
       
   
      </div>
      <ToastContainer />
      <>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      </>

    </div>
  );
}

export default InsertTrades;
