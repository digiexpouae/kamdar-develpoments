import React from 'react'
import Section1 from "../../common/section1/Section1"
import Section4 from "../../common/section4/Section4"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from '../../common/form/Form'
import Section5 from '../../common/section5/Section5'
import Section2 from './section2/Section2'
import Section3 from './section3/Section3'
import Chooseus from '../../common/chooseus/Chooseus'
import Section3Home from '../home/section3/Section3'
const About = () => {
    return (
       <>
       <Header />
                <Section1
            text={<>BUILT FOR GENERATIONS.<br />CRAFTED WITH PURPOSE</>}
            backgroundImage="/assets/aboutimages/about_header.jpg"
            mobileBackgroundImage="/assets/aboutmob.png" // your mobile bg image
         />
            <Section2 backgroundImage={'/assets/aboutimages/about_header.jpg'} /> 
          <Section3 />
          <Chooseus />
          <Section3Home bgImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+XxKQAAAAASUVORK5CYII="/>
          <Form />
        <Footer />
    </>
  )
}

export default About
 