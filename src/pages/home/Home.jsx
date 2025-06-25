import Form from "../../common/form/Form";
import Section1 from "../../common/section1/Section1"
import Section2 from '../../common/section2/Section2';
import Section3 from "./section3/Section3";
import Section4 from "../../common/section4/Section4";
import Section5 from "../../common/section5/Section5";
import Slider from "./slider/Slider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Home = () => {
    return (
       <>
       <Header />
        <Section1 text={<>BUILT FOR GENERATIONS.<br />
          CRAFTED WITH PURPOSE </>}  backgroundImage={'/assets/1.png'} />
       <Section2 text={<>  ELEVATED LIVING.<br />
          WITHIN REACH  </>} />
       <Section4 text={<>SOPHISTICATED LIVING IN<br />
            THE HEART OF JVC       </>} className={'bg-cover bg-center'} backgroundImage={'/assets/3.jpg'} btntext={'Explore Now'}/>
       <Section5 text={<> CRAFTED FOR THE FEW <br /> WHO EXPECT MORE</>}/>
       <Section3/> 
       <Slider/>
       <Form/> 
       <Footer /> 
       </>
    );

}

export default Home;