import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/investment_management/trades/');
        setTrades(response.data.trades);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='h-auto min-h-screen flex items-center justify-center w-full'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='relative overflow-x-auto max-h-[70vh] overflow-y-scroll'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                identifier
                </th>
                <th scope='col' className='px-6 py-3'>
                issue_date
                </th>
                <th scope='col' className='px-6 py-3'>
                maturity_date
                </th>
                <th scope='col' className='px-6 py-3'>
                invested_amount
                </th>
                <th scope='col' className='px-6 py-3'>
                seller_identifier
                </th>
                <th scope='col' className='px-6 py-3'>
                debtor_identifier
                </th>
                <th scope='col' className='px-6 py-3'>
                interest_rate
                </th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                  <tr
                  key={trade.identifier}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <Link to={`/trade/${trade.identifier}`} >

                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                    {trade.identifier}
                  </th>
                      </Link>
                  <td className='px-6 py-4'>{trade.issue_date}</td>
                  <td className='px-6 py-4'>{trade.maturity_date}</td>
                  <td className='px-6 py-4'>{trade.invested_amount}</td>
                  <td className='px-6 py-4'>{trade.seller_identifier}</td>
                  <td className='px-6 py-4'>{trade.debtor_identifier}</td>
                  <td className='px-6 py-4'>{trade.interest_rate}</td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradeList;
