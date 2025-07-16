import React from 'react'
import Mortgage from './mortgage'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Section1 from '../../common/section1/Section1'
import Descrip from './calculatordescrip'
const index = () => {
  return (
   <> 
    <div className='relative h-screen w-full'>
      <Header />
        <Section1 
          backgroundImage="/assets/mor.jpg"
            mobileBackgroundImage="/assets/mor.jpg"
            className={'absolute z-20 inset-0'}
            />
<div className="absolute inset-0 bg-[#070707d7]   z-30 transition-opacity duration-500 "></div>
        <Mortgage className={'absolute z-40 isnset-0 !w-[100%]'} />
    </div>
      <Descrip />
    <Footer />
    </>
  )
}

export default index
