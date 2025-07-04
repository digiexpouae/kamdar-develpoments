'use client';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section1 from "../../common/section1/Section1";
import Slider from "../home/slider/Slider";
import MobileSlider from "../../common/mobileslider/mobileslider";
import Form from "../../common/form/Form";




const news = () => {

    return (
        <>
            <Header />

            <Section1
       text={<>BLOGS/ARTICLES</>}
            backgroundImage="/assets/blogs/blogs.png"
            mobileBackgroundImage="/assets/blogs/blogs.png"
           className={'h-[100vh]'}
         />

         <div className="md:block hidden">
            <Slider heading="LATEST ARTICLES" buttonheading="View All"/>
         </div>

         <div className="md:hidden block">
            <MobileSlider heading="LATEST ARTICLES"/>
         </div>
        
         <div className="md:block hidden">
            <Slider heading="LATEST BLOGS" buttonheading="View All Blogs"/>
         </div>

         <div className="md:hidden block">
            <MobileSlider heading="LATEST BLOGS"/>
         </div>
        
    
        <Form />



            <Footer />
        </>
    );
};

export default news;
