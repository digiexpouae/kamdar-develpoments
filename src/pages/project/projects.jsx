'use client';

import React, { useEffect } from 'react';
import Section1 from "../../common/section1/Section1";
// import EntranceAnimation from '../../components/EntranceAnimation';
import Section4 from "../../common/section4/Section4";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from '../../common/form/Form';
import Section5 from '../../common/section5/Section5';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import Head from 'next/head';

const Project = () => {
  useEffect(() => {
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
        <title>Our Projects | Kamdar Developments</title>
        <meta name="title" content='Dubai Real Estate Projects | New Developments in UAE' />
        <meta name="description" content="Discover Dubai real estate projects, explore upcoming projects in UAE, and invest in new property developments with high ROI properties in Dubai." />
        <meta name="keywords" content="Dubai real estate projects, upcoming projects in UAE, new property developments Dubai, High ROI Properties in Dubai" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />

      {/* Desktop Animated Scroll Panels */}
      <div className="hero relative hidden md:block">
        <Section1
          text={<>Our <br /> Portfolio</>}
          backgroundImage="/assets/projectimages/project-1.jpg"
          mobileBackgroundImage="/assets/portfoliomob.png"
          className="panel absolute inset-0 w-full h-[100dvh] md:h-[120vh] z-0"
        />

        <Section4
          overlay={true}
          heading={
            <>
              <span style={{
                fontFamily: 'Lexend',
                fontSize: '55px',
                fontStyle: 'italic',
                fontWeight: '300',
              }}
              className='tracking-[1px]'
              
              >105 </span>RESIDENCES
              <br />
              <span
             className='ms-1'

              >BY KAMDAR </span>
            </>
          }

          btntext="Explore Now"
          p={true}
          mobileBackgroundImage="/assets/projectimages/project-3.png"
          desktopBackground="/assets/projectimages/project-2.jpg"
          className="panel absolute inset-0 w-full h-[100dvh] md:h-[100vh] bg-no-repeat bg-[length:115%_135%] bg-[position:left_top_10%] z-10"
        />

        <Section5
          heading={<>Bespoke Living <br />By Kamdar</>}
          className="panel absolute inset-0 w-full h-[100dvh] md:h-[100vh] z-10"
        />
      </div>

      {/* Mobile Stacked Sections */}
      <div className="block md:hidden">
        <Section1
          text={<>Our <br /> Portfolio</>}
          backgroundImage="/assets/projectimages/project-1.jpg"
          mobileBackgroundImage="/assets/portfoliomob.png"
          className="w-full h-[100dvh]"
        />

        <Section4
          overlay={true}
          heading={
            <>
              <span style={{
                fontFamily: 'Lexend',
                fontSize: '35px',
                fontStyle: 'italic',
                fontWeight: '300',
              }}> 105 </span> RESIDENCES <br /> BY KAMDAR
            </>
          }
          btntext="Explore Now"
          p={true}
          mobileBackgroundImage="/assets/projectimages/project-3.png"
          desktopBackground="/assets/projectimages/project-2.jpg"
          className="w-full h-auto bg-no-repeat bg-cover"
        />

        <Section5
          heading={<>Bespoke Living <br />By Kamdar</>}
          className="w-full h-auto"
        />
      </div>

      <Form />
      <Footer />
    </>
  );
};

export default Project;
