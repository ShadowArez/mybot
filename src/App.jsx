import './App.css'
import React, { useCallback, useEffect, useState } from 'react';

import {getData} from './constants/db'
import usdt_img from './assets/img/logo.png';
import wallet_img from './assets/img/wallet.png';

const telegram = window.Telegram.WebApp;
const items = getData()
const App = () => {
  useEffect(()=>{
    telegram.ready();
  });
  const onConfirm = () => {
    telegram.MainButton.text = "done";
    telegram.MainButton.Show();
  };
  
  const [usdtValue, setUsdtValue] = useState('');
  const [totalValue, setTotalValue] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUsdtValue(value); // Update the input value

    // Multiply the input value by 1300 and format it with commas and two decimal places
    const newValue = parseFloat(value) * 1300 || 0;
    const formattedValue = newValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    setTotalValue(formattedValue); // Update the formatted total value
  };
  const onSendData = useCallback(() => {
    telegram.sendData(totalValue)
  },totalValue)

  useEffect(() => {
    telegram.onEvent('mainButtonClicked',totalValue)

    return () => telegram.offEvent('mainButtonClicked',totalValue)
  },totalValue)
  return (
    <>
    <div className="main">
      <div className="card">
        <div className="head">
          <div className="button">
            <div className="price">
              <h1>1,300 IQD</h1>
            </div>
            <div className="title">نرخی 1 USDT</div>
          </div>
        </div>
        <div className="container">
          <div className="cards">
            <div className="card">
              <div className="head">
                <h1>بڕی USDT بنووسە</h1>
              </div>
              <div className="input">
                <div className="img">
                  <img src={usdt_img} alt="" />
                </div>
                <input
                  type="number"
                  placeholder='بڕی USDT بنووسە...'
                  value={usdtValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="card">
              <div className="head">
                <h1>كۆی نرخی USDT</h1>
              </div>
              <div className="input">
                <div className="img">
                  <img src={wallet_img} alt="" />
                </div>
                <input
                  type="text"
                  placeholder='كۆی نرخی USDT'
                  disabled
                  value={totalValue}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button title="پاشگەزبوونەوە"/>
          <button className='confirm' onClick={onConfirm} title="دووپاتكردنەوە"/>
        </div>
      </div>
    </div>
    {/* <div className='cards__container'>
      {items.map(item => (
        <>
        <Card key={item.id} course={item}/>
        </>
      ))}
    </div> */}
    </>
  )
}

export default App