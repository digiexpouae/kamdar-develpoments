import Section1 from "../../components/section1/Section1"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ContactSection from "../105/Map"
import Form from "../contact/Form"
import Slide from "../contact/Slide"

export default function Page() {
  return (
    <>
      <Header />
      <Section1
        text={<>GET IN TOUCH</>}
        backgroundImage="/assets/contact/contactbg.png"
        mobileBackgroundImage="/assets/contact/contactbgmob.png"
      />
      <Form />
      <ContactSection />
      <Slide />
      <Footer />
    </>
  )
}
