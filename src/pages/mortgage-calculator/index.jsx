import React, { useEffect, useState } from 'react'
import Mortgage from './mortgage'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Section1 from '../../common/section1/Section1'
import CalculationsSection from './CalculationsSection'
const index = () => {
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

 


  return (
   <> 
    <div className='relative h-screen w-full'>
      <Header />
        <Section1 
          backgroundImage="/assets/white.png"
            mobileBackgroundImage="/assets/white.png"
            className={'absolute z-20 inset-0 !text-black'}
     
            />
      <Mortgage className='absolute z-40 inset-0 !w-[100%]'
      propertyPrice={propertyPrice}
      setPropertyPrice={setPropertyPrice}
      downPaymentPercentage={downPaymentPercentage}
      setDownPaymentPercentage={setDownPaymentPercentage}
      interestRate={interestRate}
      setInterestRate={setInterestRate}
      loanTerm={loanTerm}
      setLoanTerm={setLoanTerm}
      loanAmount={loanAmount}
    />
     
    </div>
    {typeof monthlyPayment === 'number' && typeof totalInterest === 'number' && (
  <CalculationsSection
    monthlyPayment={monthlyPayment}
    totalInterest={totalInterest}
    loanAmount={loanAmount}
    totalPayment={totalPayment}
  />
)}   <Footer />
    </>
  )
}

export default index
