import Head from 'next/head';
import Section1 from "../../common/section1/Section1"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "./Form";
import Map from "../../common/Map";

const Contact = () => {
   return (
      <>
         <Head>``
           <title>Contact Us | Kamdar Developments - Get in Touch</title>
           <meta name="title" content='Real Estate Consultancy & Developers in Dubai UAE' />
           <meta name="description" content="Contact real estate developers in Dubai. UAE property developers offering expert real estate consultancy. Work with the best property developers in Dubai." />
           <meta name="keywords" content="Real Estate Consultancy Dubai, contact real estate developers dubai,  UAE property developers, best property developers in dubai" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </Head>
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