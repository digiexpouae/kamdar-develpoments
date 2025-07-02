'use client';
import { useEffect } from "react";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../common/form/Form";
import Section1 from "../../common/section1/Section1";
import Section2 from '../../common/section2/Section2';
import Section3 from "./section3/Section3";
import Section4 from "../../common/section4/Section4";
import Section5 from "../../common/section5/Section5";
import Slider from "./slider/Slider";
import MobileSlider from "../../common/mobileslider/mobileslider";

const Home = () => {

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

  return (
    <>

      <Header />
      <div className="hero relative">
        <Section1
          text={<>BUILT FOR GENERATIONS,<br />CRAFTED WITH PURPOSE</>}
          backgroundImage="/assets/1.png"
          mobileBackgroundImage="/assets/homemob.png"
          className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-0"
        />

        <Section2
          text={<>ELEVATED LIVING,<br />WITHIN REACH</>}
          className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10"
        />

        <Section4
          heading={<>SOPHISTICATED LIVING IN<br />THE HEART OF JVC</>}
          desktopBackground="/assets/3.jpg"
          btntext="Explore More"
          className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10 bg-cover bg-center"
        />

        <Section5
          heading={<>CRAFTED FOR THE FEW <br /> WHO EXPECT MORE</>}
          className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10"
        />
      </div>

      <Section3 className="panel" />

      {/* Slider components */}
      <div className="hidden md:block">
        <Slider />
      </div>
      <div className="block md:hidden">
        <MobileSlider />
      </div>

      <Form />
      <Footer />
    </>
  );
};

export default Home;

