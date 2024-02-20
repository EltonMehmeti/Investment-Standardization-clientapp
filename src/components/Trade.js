import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarComponent from './Sidebar';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
const Trade = () => {
  const [trades, setTrades] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(sessionStorage.getItem('organizationId') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [modal, setModal] = useState(null)
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/trades/get-create/?organizationId=${selectedOrganization}&page=${currentPage}`);
        setTrades(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };
  
    if (selectedOrganization) {
      fetchTrades();
    }
  }, [selectedOrganization, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [formData, setFormData] = useState({
    identifier: '',
    issue_date: '',
    maturity_date: '',
    invested_amount: '',
    interest_rate: '',
    organization: selectedOrganization, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/trades/get-create/', formData);
      console.log('Trade created:', response.data);
      toast.success('Trade created: ' ,response.data)
    } catch (error) {
      console.error('Error creating trade:', error);
    }
  };
  return (
    <div className='h-screen flex flex-row items-center gap-20 '>
      <SidebarComponent />

      <div className='flex flex-col  '>
      <button onClick={()=>{setModal(true)}} type="button" class="text-white bg-yellow-400 w-24 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
       Create       
        </button>
        <Modal show={modal} onClose={()=>{setModal(false)}} >
          <div className='flex lfex-col p-20 w-1/2 '>


 

          <form onSubmit={handleSubmit}class="max-w-md mx-auto">

  <div class="relative z-0 w-full mb-5 group">
  <input
        type="text"
        name="identifier"
        onChange={handleChange}
        id="identifier"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label for="identifier" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Identifier</label>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
    <input
        type="date"
        name="issue_date"
        id="issue_date"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        onChange={handleChange}
      />      
      <label for="maturity_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Issue Date</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
    <input
        type="date"
        name="maturity_date"
        id="maturity_date"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        onChange={handleChange}
      />     
      <label for="invested_amount" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Maturity Date</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
    <input
        type="number"
        name="invested_amount"
        id="invested_amount"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        onChange={handleChange}
      />      
      <label for="maturity_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Invested Amount</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
    <input
        type="number"
        name="interest_rate"
        id="interest_rate"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        onChange={handleChange}
      />     
      <label for="invested_amount" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Interest Rate</label>
    </div>
  </div>
 
  <button type="submit" class="text-white bg-blue-700 mx-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={()=>{setModal(false)}}>Close</button>
</form>



          
          </div>
        </Modal>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full max-h-[80vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">Identifier</th>
              <th scope="col" className="px-6 py-3">Issue Date</th>
              <th scope="col" className="px-6 py-3">Maturity Date</th>
              <th scope="col" className="px-6 py-3">Invested Amount</th>
              <th scope="col" className="px-6 py-3">Interest Rate</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className='max-h-[70vh] overflow-y-scroll'>
            {trades.map((trade, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trade.identifier}</td>
                <td className="px-6 py-4">{trade.issue_date}</td>
                <td className="px-6 py-4">{trade.maturity_date}</td>
                <td className="px-6 py-4">{trade.invested_amount}</td>
                <td className="px-6 py-4">{trade.interest_rate}</td>
                <td className="px-6 py-4">{trade.created_at}</td>
                <td className="px-6 py-4">
                  <Link to={`/trade/${trade.id}`}>See More</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className="flex justify-center my-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`mx-1 px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 ${currentPage === i + 1 ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              {i + 1}
            </button>
          ))}
        </div>
        <ToastContainer/>
        </div>
    </div>
  );
};

export default Trade;
