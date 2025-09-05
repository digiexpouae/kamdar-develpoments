'use client';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section1 from "../../common/section1/Section1";
import Slider from "./Slider";
import MobileSlider from "../../common/mobileslider/mobileslider";
import Form from "../../common/form/Form";




const news = () => {

    return (
        <>
            <Header />
            <div className="md:block hidden  ">
           <Section1
       text={<>LATEST NEWS</>}
            backgroundImage="/assets/latestnews.jpg"
            mobileBackgroundImage="/assets/latestnews.jpg"
           className={'h-[100vh] relative'}

         />
       
</div>
         <div className="md:hidden block">
         <Section1
       text={<><span className="text-5xl"> BLOGS/ARTICLES</span></>}
            backgroundImage="/assets/latestnews.jpg"
            mobileBackgroundImage="/assets/latestnews.jpg"
           className={'h-[100vh]'}
         />
           
         </div>
            

         <div className="md:block hidden">
            <Slider heading="FEATURED IN" href="/blogs" buttonheading="View All"/>
         </div>

         <div className="md:hidden block">
            <MobileSlider heading="FEATURED IN" />
         </div>
        
     <div className="md:block hidden">
            <Slider heading="LATEST BLOGS" href="/blogs" buttonheading="View All Blogs"/>
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
