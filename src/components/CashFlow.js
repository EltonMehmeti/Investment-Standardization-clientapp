import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarComponent from './Sidebar';

const CashFlow = () => {
  const [cashflows, setCashflows] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(sessionStorage.getItem('organizationId') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCashflows = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cash_flows/get-create/?organizationId=${selectedOrganization}&page=${currentPage}`);
        setCashflows(response.data.results);
        setTotalPages(response.data.total_pages);


      } catch (error) {
        console.error('Error fetching cashflows:', error);
      }
    };

    if (selectedOrganization) {
      fetchCashflows();
    }
  }, [selectedOrganization, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='h-screen flex flex-row items-center gap-20 '>
      <SidebarComponent />
      <div className='flex flex-col'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full max-h-[80vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">Identifier</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Trade</th>
              <th scope="col" className="px-6 py-3">CashFlow Type</th>
            </tr>
          </thead>
          <tbody className='max-h-[70vh] overflow-y-scroll'>
            {cashflows?.map((cashflow, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cashflow.identifier}</td>
                <td className="px-6 py-4">{cashflow.amount}</td>
                <td className="px-6 py-4">{cashflow.date}</td>
                <td className="px-6 py-4">{cashflow.trade_identifier}</td>
                <td className="px-6 py-4">{cashflow.cash_flow_type_name}</td>
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
      </div>

    </div>
  );
};

export default CashFlow;
