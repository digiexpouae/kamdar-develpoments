import Section1 from "../../common/section1/Section1"
import Section4 from "../../common/section4/Section4"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactSection from "./Map";
import Form from "../contact/Form";
import Slide from "./Slide";

const Project1 = () => {
   return (
      <>
         <Header />
         <Section1
            text={<>RESIDENCE BY KAMDAR</>}
            backgroundImage="/assets/105bg.png"
            mobileBackgroundImage="/assets/portfoliomob.png" // your mobile bg image
         />
         <Slide />
         <Section4 heading={<>Studio Apartments       </>}
            className={'bg-cover bg-center bg-no-repeat'}
            desktopBackground={'/assets/105/1.png'}
            text={<>Size Range: 394 to 468 sq. ft.
               Layout Variations: At least two types
               </>}
            mobileBackground={'/assets/105/mob1.png'}
            btntext={'Explore Now'} />

         <Section4 heading={<>ONE BED APARTMETNS      </>}
            className={'bg-cover bg-center'}
            desktopBackground={'/assets/105/2.png'}
            mobileBackground={'/assets/105/mob2.png'}
            btntext={'Explore Now'} />

         <Section4 heading={<>TWO BED APARTMETNS      </>}
            className={'bg-cover bg-center'}
            desktopBackground={'/assets/105/3.png'}
            mobileBackground={'/assets/105/mob3.png'}
            btntext={'Explore Now'} />

         <Form />
         <Footer />



      </>
   );
}

export default Project1;