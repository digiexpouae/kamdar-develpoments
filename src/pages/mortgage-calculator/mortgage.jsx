import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';


const MortgageCalculator = ({
  className,
  propertyPrice,
  setPropertyPrice,
  downPaymentPercentage,
  setDownPaymentPercentage,
  interestRate,
  setInterestRate,
  loanTerm,
  setLoanTerm,
  loanAmount,
  data,
  COLORS
}) => {

  const fadeVariants = {
    hidden: { opacity: 0, y:20 },
    visible: {
        y: 0,
      opacity: 1,
      transition: {
        duration: 3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
  };
// * kamdar
  return (
    <div className={`mortgage-calculator-container bg-transparent text-white p-4 font-sans w-full h-full flex flex-col justify-center ${className}`}>
        <div className='mortgage-calculator-content'>
      <div className="mortgage-calculator">
      <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className={`reveal-on-scroll text-black text-center text-4xl md:text-7xl md:leading-[0.8] `}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
        Mortgage Calculator
        </motion.h1>
        <div className="calculator-body">
          <div className="flex flex-col gap-6">
            <div className="calculator-inputs">
              <div className='flex flex-wrap gap-6'>
                {/* Property Price */}
                <div className="input-group flex-1 min-w-[250px]">
                  <label>Property Price:</label>
                  <div className="input-field">
                    <input 
                      type="number" 
                      value={propertyPrice} 
                      onChange={(e) => setPropertyPrice(parseFloat(e.target.value))} 
                    />
                    <div className="input-adornment">
                      <span>AED</span>
                      <button type="button" onClick={() => setPropertyPrice(prev => (prev || 0) + 100)}>+</button>
                      <button type="button" onClick={() => setPropertyPrice(prev => Math.max(0, (prev || 0) - 100))}>-</button>
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="input-group flex-1 min-w-[250px]">
                  <label>Interest Rate:</label>
                  <div className="input-field">
                    <input 
                      type="number" 
                      value={interestRate} 
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))} 
                      step="0.1"
                      min="0"
                      max="100"
                    />
                    <div className="input-adornment">
                      <span>%</span>
                      <button type="button" onClick={() => setInterestRate(prev => (prev || 0) + 0.1)}>+</button>
                      <button type="button" onClick={() => setInterestRate(prev => Math.max(0, (prev || 0) - 0.1))}>-</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-6 mt-6'>
                {/* Down Payment */}
                <div className="input-group flex-1 min-w-[250px]">
                  <label>Down Payment</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={downPaymentPercentage} 
                    onChange={(e) => setDownPaymentPercentage(parseFloat(e.target.value) || 0)} 
                  />
                  <p className='text-black'>Loan Amount: AED {loanAmount ? loanAmount.toFixed(2) : '0.00'}</p>
                </div>

                {/* Loan Term */}
                <div className="input-group flex-1 min-w-[250px]">
                  <label>Loan Term ({loanTerm} Years):</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={loanTerm} 
                    onChange={(e) => setLoanTerm(parseInt(e.target.value) || 1)} 
                  />
                </div>
              </div>
              <button className="expert-advice-btn">Get Expert Advice</button>
            </div>
         

            </div>
       
          </div>
      </div>
  
      </div>
    </div>
  );
};

export default MortgageCalculator;
