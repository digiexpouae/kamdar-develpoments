
import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Section1 from "../../common/section1/Section1"
import Image from "next/image"
import Section from './section'
import OpportunitiesForm from "./oppurtunities"
import Open from './openposition'
const career=()=>{

    return(
        <div>
          <div className='w-full md:block  relative h-screen '>
          <Header />
            <Section1    text={'Career'}    backgroundImage="/assets/career.jpg"   
     mobileBackgroundImage="/assets/career.jpg"   /> 
            </div>
            <Section />
            <Open />
            <OpportunitiesForm />
            <Footer />
        </div>
    )
}
export default career