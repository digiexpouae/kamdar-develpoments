import React from 'react'
import Section1 from "../../common/section1/Section1"
import Section4 from "../../common/section4/Section4"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from '../../common/form/Form'
import Section5 from '../../common/section5/Section5'

const About = () => {
    return (
       <>
       <Header />
        <Section1 text={<>Driven by Detail,
            Defined by Integrity</>} backgroundImage={'/assets/projectimages/project-1.jpg'} />
          <Section4  overlay={true} className={'bg-no-repeat bg-[length:115%_135%] bg-[position:left_top_10%]'} backgroundImage={'/assets/projectimages/project-2.jpg'} titleNumbertext={'105'} text={<> Residences<br /> By Kamdar</>} btntext={<>Explore More</>} p={true} text1={<> JVC, Dubai</>} />
          <Section5 text={<> Bespoke Living <br />
            By Kamdar</>}/>
          <Form />
        <Footer />
    </>
  )
}

export default About
 