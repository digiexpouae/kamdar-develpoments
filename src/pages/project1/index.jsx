import Section1 from "../../common/section1/Section1"
import Section4 from "../../common/section4/Section4"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactSection from "./Map";
import Form from "../contact/Form";
import Slide from "./Slide";
import Places from '../../common/places/place'
import Icons from '../../common/icons'

const Project1 = () => {


   const icons = [
      { img:'/assets/105/Vector.svg' , name: 'Dubai Miracle Garden', distance: '10 minutes' },
      { img:'/assets/105/Vector2.svg' , name: 'Dubai Marina Mall', distance: '15 minutes' },
      { img:'/assets/105/g2589.svg' , name: 'Downtown & Dubai MAll', distance: '20 minutes' },
      { img:'/assets/105/vector4.svg'  , name: 'Al-Maktoum Airport', distance: '25 minutes' },
      { img:'/assets/105/vector4.svg' , name: 'International Airport', distance: '30 minutes' },
    ]
   const markers = [
      { name: 'Mall of the Emirates', coordinates: [25.118009,	55.200367], icon: '/assets/105/Vector.svg' },
      { name: 'Dubai Marina	', coordinates: [25.080562,	55.140911], icon: '/assets/105/Vector2.svg' },
      { name: 'Down Town', coordinates: [25.1951, 55.2744],  icon: '/assets/105/Vector4.svg'  },

    
   ];
    
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
<section className="bg-black py-10">
<div className="text-center mt-10 mb-10 md:px-5 px-2">
                <h2
                    className="text-5xl md:text-7xl font-bold text-center text-white"
                    style={{
                        fontFamily: 'Luxerie, sans-serif',
                    }}
                >
              Connected to<br /> Everything That Matters
                </h2>
                <p className="text-white text-sm md:text-md font-base font-lexend mt-4 max-w-xl mx-auto">
                Enjoy seamless access to Dubai’s top destinations — from malls and marinas to airports and iconic landmarks — all just minutes from your doorstep.
                </p>
            </div>

   <Places center_position={[25.0631, 55.2471]} name={'105 Residences'} Main_marker={'105 Residences'} markers={markers}/>
   <Icons  icons={icons}/>

</section>
         <Form />
         <Footer />
      </>
   );
};

export default Project1;
