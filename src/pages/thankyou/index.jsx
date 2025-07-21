import Section1 from "../../common/section1/Section1";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Thankyou = () => {
    return (
        <>
            <Header />
            <Section1
                text={<span className="text-7xl">THANK YOU SO MUCH</span>}
                backgroundImage="/assets/thanksbg.png"
                mobileBackgroundImage="/assets/thanksbg.png"
                className={'h-[100vh] thank-you-heading'}
                description={"We've received your submission and one of our representatives will reach out to you shortly to assist you further."}
            />
            <Footer />
        </>
    );
};

export default Thankyou;