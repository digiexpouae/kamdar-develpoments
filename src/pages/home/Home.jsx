'use client';
import { useEffect, useState } from "react";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../common/form/Form";
import Section1Video from "../../common/Section1video/Section1Video";
import Section2 from '../../common/section2/Section2';
import Section3 from "./section3/Section3";
import Section4 from "../../common/section4/Section4";
import Section5 from "../../common/section5/Section5";
import Slider from "../../components/Slider";
import MobileSlider from "../../common/mobileslider/mobileslider";

const Home = () => {
  useEffect(() => {
    // Run animations only on desktop
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);

    const panels = gsap.utils.toArray(".panel:not(:first-child)");

    gsap.set(panels[0], { yPercent: 0, zIndex: 1 });
    gsap.set(panels, {
      yPercent: 100,
      zIndex: (i) => i + 2
    });

    const scroll = `+=${panels.length * 100}%`;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Top Real Estate Developers Dubai | Property for Sale UAE</title>
        <meta name="title" content='Top Real Estate Developers Dubai | Property for Sale UAE' />
        <meta name="description" content="Kamdar Developments offers property for sale in Dubai. Trusted among top real estate developers in Dubai and top property developers in UAE for premium homes." />
        <meta name="keywords" content="top real estate developers in dubai, property for sale in dubai, dubai properties for sale, property developers in uae" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />

      {/* Desktop animated section */}
      <div
        className="hero relative"

      >
        <div className="md:block hidden">
          <Section1Video
          text={<>BUILT FOR GENERATIONS,<br />CRAFTED WITH PURPOSE</>}
            backgroundImage="/assets/homevideo.mp4"
            mobileBackgroundImage="/assets/homevideo.mp4"
            placeholderImage="/assets/1.png"
            className="panel inset-0 absolute w-full h-[100vh] z-0"
          />

          <Section2
            text={<>ELEVATED LIVING,<br />WITHIN REACH</>}
            backgroundImage="/assets/2.png"
            className="panel inset-0 absolute w-full h-[100vh] z-10"
          />
          <Section4
            heading={<>SOPHISTICATED LIVING IN<br />THE HEART OF JVC</>}
            desktopBackground="/assets/3.jpg"
            btntext="Explore More"
            className="panel inset-0 absolute w-full h-[100vh] z-10 bg-cover bg-center"
          />
          <Section5
            heading={<>CRAFTED FOR THE FEW <br /> WHO EXPECT MORE</>}
            className="panel inset-0 absolute w-full h-[100vh] z-10"
          />
        </div>
      </div>

      {/* Mobile stacked sections */}
      <div className="block md:hidden">
        <Section1Video
        
        text={<>BUILT FOR GENERATIONS,<br />CRAFTED WITH PURPOSE</>}
         backgroundImage="/assets/homevideo.mp4"
         mobileBackgroundImage="/assets/homevideo.mp4"
         placeholderImage="/assets/homemob.png"
          className="w-full h-[100dvh]"
        />
        <Section2
          text={<>ELEVATED LIVING,<br />WITHIN REACH</>}
          backgroundImage="/assets/2.png"
          mobileBackgroundImage="/assets/2.png"
          className="w-full h-auto"
        />
        <Section4
          heading={<>SOPHISTICATED LIVING IN<br />THE HEART OF JVC</>}
          desktopBackground="/assets/3.jpg"
          btntext="Explore More"
          className="w-full h-auto bg-cover bg-center"
        />
        <Section5
          heading={<>CRAFTED FOR THE FEW <br /> WHO EXPECT MORE</>}
          className="w-full h-auto"
        />
      </div>

      <Section3 className="panel" />

      {/* Sliders */}
      <div className="hidden md:block">
        <Slider heading="LATEST NEWS" href="/news" buttonheading="View All News" />
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
