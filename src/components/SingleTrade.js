import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SidebarComponent from './Sidebar';

const TradeDetail = () => {
    const { id } = useParams();
    const [trade, setTrade] = useState(null);
    const [referenceDate, setReferenceDate] = useState('2023-12-04');
    const [realizedAmount, setRealizedAmount] = useState(null);
    const [grossExpectedAmount, setGrossExpectedAmount] = useState(null);
    const [remainingInvestedAmount, setRemainingInvestedAmount] = useState(null);
    const [closingDate, setClosingDate] = useState(null);

    useEffect(() => {
        const fetchTrade = async () => {
            try {
                const response = await fetch(`http://localhost:8000/trades/detail/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch trade details');
                }
                const tradeData = await response.json();
                setTrade(tradeData);
            } catch (error) {
                console.error('Error fetching trade details:', error);
            }
        };

        const fetchTradeDetails = async () => {
            try {
                const realizedAmountResponse = await axios.post(`http://localhost:8000/trades/realized_amount/${trade.identifier}/`, { reference_date: referenceDate });
                setRealizedAmount(realizedAmountResponse.data.realized_amount);

                const grossExpectedAmountResponse = await axios.post(`http://localhost:8000/trades/gross_expected_amount/${trade.identifier}/`, { reference_date: referenceDate });
                setGrossExpectedAmount(grossExpectedAmountResponse.data.gross_expected_amount);

                const remainingInvestedAmountResponse = await axios.post(`http://localhost:8000/trades/remaining_invested_amount/${trade.identifier}/`, { reference_date: referenceDate });
                setRemainingInvestedAmount(remainingInvestedAmountResponse.data.remaining_invested_amount);

                const closingDateResponse = await axios.get(`http://localhost:8000/trades/closing_date/${trade.identifier}/`);
                setClosingDate(closingDateResponse.data);
            } catch (error) {
                console.error('Error fetching trade details:', error);
            }
        };

        fetchTrade();
        fetchTradeDetails();
    }, [id, referenceDate]);

    const handleReferenceDateChange = (e) => {
        setReferenceDate(e.target.value);
    };

    return (
        <div className='h-screen flex flex-row gap-20 items-center'>
            <SidebarComponent/>
            {trade ? (
                <>
                <div className='flex flex-col p-10 bg-gray-800 text-white rounded-3xl'>
                    <h2>Trade Details</h2>
                    <h1 class="text-2xl text-gray-100 font-medium leading-8 mt-5">Identifier: {trade.identifier}</h1>
                    <p class="text-2xl text-gray-100 font-medium leading-8 mt-5">Issue Date: {trade.issue_date}</p>
                    <p class="text-2xl text-gray-100 font-medium leading-8 mt-5">Maturity Date: {trade.maturity_date}</p>
                    <p class="text-2xl text-gray-100 font-medium leading-8 mt-5">Invested Amount: {trade.invested_amount}</p>
                    <p class="text-2xl text-gray-100 font-medium leading-8 mt-5">Interest Rate: {trade.interest_rate}</p>
                    {/* Add more trade details as needed */}
                    <label htmlFor="referenceDate">Reference Date:</label>
                    <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                    type="date" id="referenceDate" value={referenceDate} onChange={handleReferenceDateChange} />
                    <p>Realized Amount: {realizedAmount}</p>
                    <p>Gross Expected Amount: {grossExpectedAmount}</p>
                    <p>Remaining Invested Amount: {remainingInvestedAmount}</p>
                    <p>Closing Date: <p className={`${closingDate == 'Loan Not Closed!' ? 'text-red-600' : 'text-green-500'}`}>
                        
                        {closingDate}
                        </p>
                        </p>
                </div>
                <table className="w-1/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
            {trade.cash_flows?.map((cashflow, index) => (
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
                </>
                
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TradeDetail;
