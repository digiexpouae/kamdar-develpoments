import Section1 from "../../common/section1/Section1"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "./Form";
import Map from "../project1/Map";

const Contact = () => {
   return (
      <>
         <Header />
         <Section1
            text={<>GET IN TOUCH</>}
            backgroundImage="/assets/contact/contactbg.png"
            mobileBackgroundImage="/assets/contact/contactbgmob.png" // your mobile bg image
         />
         <Form />
         <Map />
         <Footer />

      </>
   );
}

export default Contact;