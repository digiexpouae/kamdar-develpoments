import Form from "./form/Form";
import Section1 from "./section1/Section1";
import Section2 from './section2/Section2';
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";
import Section5 from "./section5/Section5";
import Slider from "./slider/Slider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Home = () => {
    return (
       <>
       <Header />
       <Section1 />
       <Section2 />
       <Section4/>
       <Section5/>
       <Section3/> 
       <Slider/>
       <Form/> 
       <Footer /> 
       </>
    );

}

export default Home;