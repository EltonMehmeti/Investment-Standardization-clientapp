import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
const SingleTrade = () => {
  const [tradeData, setTradeData] = useState(null);
  const params = useParams();
  const identifier = params.identifier;
  console.log(identifier);
  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/investment_management/trade/${identifier}/`)
      .then(response => {
        setTradeData(response.data.trade);
        console.log(tradeData);
      })
      .catch(error => {
        console.error('Error fetching trade data:', error);
      });
  }, [identifier]); 

  return (
    <div>
      {tradeData ? (
        <div className=''>
            <div>
          <h2>{tradeData.identifier}</h2>
          <p>Issue Date: {tradeData.issue_date}</p>
          <p>Maturity Date: {tradeData.maturity_date}</p>
                </div>
                <div>


                <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                platform_transaction_id
                </th>
                <th scope="col" class="px-6 py-3">
                amount
                </th>
                <th scope="col" class="px-6 py-3">
                timestamp
                </th>
                <th scope="col" class="px-6 py-3">
                trade_identifier
                </th>
                <th scope="col" class="px-6 py-3">
                operation_id
                </th>
            </tr>
        </thead>
        <tbody>
            {tradeData?.cashflows.map((cashflow)=>{
return(

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {cashflow.platform_transaction_id
}
                </th>
                <td class="px-6 py-4">
                   {cashflow.amount}
                </td>
                <td class="px-6 py-4">
                    {cashflow.timestamp}
                </td>
                <td class="px-6 py-4">
                  {cashflow.trade_identifier}
                </td>
                <td class="px-6 py-4">
                  {cashflow.operation_id}
                </td>
            </tr>
)

})}
         
        </tbody>
    </table>
</div>


                </div>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleTrade;
