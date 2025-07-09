import Head from 'next/head';
import Section1Video from "../../common/Section1video/Section1Video"
import { useEffect } from "react";
import Section4 from "../../common/section4/Section4"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Form from "../../common/form/Form";
import Slide from "./Slide";
import Places from '../../common/places/place'
import Icons from '../../common/icons'

const Project1 = () => {


   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.normalizeScroll(true);

      const panels = gsap.utils.toArray(".panel:not(:first-child)");

      gsap.set(panels[0], { yPercent: 0, zIndex: 1 }); // First panel
      gsap.set(panels, {
         yPercent: 100,
         zIndex: (i) => i + 2
      });

      const scroll = `+=${panels.length * 100}%`;

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            endTrigger: 'bottom bottom',
            end: `${scroll}vh`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
         }
      });

      panels.forEach((panel) => {
         tl.to(panel, {
            yPercent: 0,
            ease: "none"
         }, "+=0.5");
      });

      // CLEANUP on unmount
      return () => {
         // Kill all ScrollTriggers and timelines
         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
         gsap.globalTimeline.clear();
      };
   }, []);


   const icons = [
      { img: '/assets/105/Vector.svg', name: 'Dubai Miracle Garden', distance: '10 minutes' },
      { img: '/assets/105/Vector2.svg', name: 'Dubai Marina Mall', distance: '15 minutes' },
      { img: '/assets/105/g2589.svg', name: 'Downtown & Dubai MAll', distance: '20 minutes' },
      { img: '/assets/105/vector4.svg', name: 'DWC Airport', distance: '30 minutes' },
      { img: '/assets/105/vector4.svg', name: 'DXB Airport', distance: '25 minutes' },
   ]
   const markers = [
      { name: 'Mall of the Emirates', coordinates: [25.118009, 55.200367], icon: '/assets/105/Vector.svg' },
      { name: 'Dubai Marina	', coordinates: [25.080562, 55.140911], icon: '/assets/105/Vector2.svg' },
      { name: 'Down Town', coordinates: [25.1951, 55.2744], icon: '/assets/105/Vector4.svg' },


   ];

   return (
      <>
         <Head>
           <title>105 Residences | Luxury & Modern Apartments in Dubai | Book Yours Today</title>
           
           <meta name="title" content='Luxury & Modern Apartments in Dubai | Book Yours Today' />
           <meta name="description" content="Book your modern apartment at 105 Residences. Kamdar offers luxury architecture and elegant living in the heart of Dubai." />
           <meta name="keywords" content="luxury apartments in Dubai, Book Apartment in Dubai, Modern Apartments in Dubai, Modern Architecture Residences Dubai" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </Head>
         <Header />
         <Section1Video
            backgroundImage="/assets/105video.mp4"
            mobileBackgroundImage="/assets/105video.mp4"
            text={<><span style={{ fontFamily: 'lexend',
               fontSize: '55px',
               fontStyle: 'italic',
               fontWeight: '300',
             }}>105 </span>RESIDENCES<br />BY KAMDAR</>}
            className="h-screen w-full"
         />
         <Slide />
         <Section4 
            heading={<>STUDIO APARTMENTS</>}
            className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10 bg-cover bg-center"
            desktopBackground={'/assets/105/1.png'}
            mobileBackground={'/assets/105/mob1.png'}
            btntext={'Learn More'}
            isProject1={true} />

         <Section4 
            heading={<>ONE BED APARTMENTS</>}
            className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-0 bg-cover bg-center"
            desktopBackground="/assets/105/2.png"
            mobileBackground={'/assets/105/mob2.png'}
            btntext={'Learn More'}
            isProject1={true} />

         <Section4 
            heading={<>TWO BED APARTMENTS</>}
            className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10 bg-cover bg-center"
            desktopBackground="/assets/105/3.png"
            mobileBackground={'/assets/105/mob3.png'}
            btntext={'Learn More'}
            isProject1={true} />
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

            <Places center_position={[25.0631, 55.2471]} name={'105 Residences'} Main_marker={'105 Residences'} markers={markers} />
            <Icons icons={icons} />

         </section>
         <div id="register-form">
           <Form   />
         </div>
         <Footer />
      </>
   );
};

export default Project1;
