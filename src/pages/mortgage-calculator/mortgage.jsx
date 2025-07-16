import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const MortgageCalculator = ({className}) => {
  const [propertyPrice, setPropertyPrice] = useState(1000);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5);

  const [downPaymentAmount, setDownPaymentAmount] = useState(propertyPrice * (downPaymentPercentage / 100));

  useEffect(() => {
    setDownPaymentAmount(propertyPrice * (downPaymentPercentage / 100));
  }, [propertyPrice, downPaymentPercentage]);

  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
  const totalPayment = loanAmount + totalInterest;

  const data = [
    { name: 'Loan Amount', value: loanAmount },
    { name: 'Interest', value: totalInterest },
  ];

  const COLORS = ['#626567 ', '#212f3d '];

  



  return (
    <div className={`mortgage-calculator-container bg-transparent text-white p-4 font-sans w-full h-full flex flex-col justify-center ${className}`}>
        <div className='mortgage-calculator-content'>
      <div className="mortgage-calculator">
        <h2>Mortgage Calculator</h2>
        <div className="calculator-body">
          <div className="flex flex-col">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Property Price:</label>
                <div className="input-field">
                  <input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(parseFloat(e.target.value))} />
                  <div className="input-adornment">
                    <span>AED</span>
                    <button onClick={() => setPropertyPrice(propertyPrice + 100)}>+</button>
                    <button onClick={() => setPropertyPrice(propertyPrice - 100)}>-</button>
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label>Down Payment</label>
                <input type="range" min="0" max="100" value={downPaymentPercentage} onChange={(e) => setDownPaymentPercentage(parseFloat(e.target.value))} />
                <p>Loan Amount: AED {loanAmount.toFixed(2)}</p>
              </div>
              <div className="input-group">
                <label>Interest Rate:</label>
                <div className="input-field">
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                  <div className="input-adornment">
                    <span>%</span>
                    <button onClick={() => setInterestRate(interestRate + 0.1)}>+</button>
                    <button onClick={() => setInterestRate(interestRate - 0.1)}>-</button>
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label>Loan Term ({loanTerm} Years):</label>
                <input type="range" min="1" max="30" value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))} />
              </div>
            </div>
            <button className="expert-advice-btn">Get Expert Advice</button>

            </div>
            <div className="result-details">
                <div className='result-detail-content'>
                  <p>Monthly Payment: <span>AED {monthlyPayment.toFixed(2)}</span></p>
                  <p>Interest: <span>AED {totalInterest.toFixed(2)}</span></p>
                  <p>Annual Payment: <span>AED {(monthlyPayment * 12).toFixed(2)}</span></p>
                  <p>Total Interest: <span>AED {totalInterest.toFixed(2)}</span></p>
                  <p>Total Payment: <span>AED {totalPayment.toFixed(2)}</span></p>
                </div>
              </div>
              <div className="calculator-results">
                <div className="chart-container" style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Legend verticalAlign="top" align="right" iconType="square" height={36} wrapperStyle={{ color: '#FFFFFF' }}/>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke={index === 1 ? '#212f3d ': '#626567'}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
          </div>
      </div>
  
      </div>
    </div>
  );
};

export default MortgageCalculator;
