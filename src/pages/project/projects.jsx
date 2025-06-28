'use client';

import React, { useEffect } from 'react';
import Section1 from "../../common/section1/Section1";
import Section4 from "../../common/section4/Section4";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from '../../common/form/Form';
import Section5 from '../../common/section5/Section5';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const Project = () => {

  useEffect(() => {
    if (window.innerWidth < 768) return; // ❌ Skip animations on mobile

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

  }, []);

  return (
    <>
      <Header />

      {/* Scroll panels */}
      <div className="hero relative">
        <Section1
          text={<>Our <br /> Portfolio</>}
          backgroundImage="/assets/projectimages/project-1.jpg"
          mobileBackgroundImage="/assets/portfoliomob.png"
          className="panel absolute inset-0 w-full h-[100dvh] md:h-[120vh] z-0"
        />

        <Section4
          overlay={true}
          heading={<>Residences<br /> By Kamdar</>}
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

      {/* After scroll-pinned panels */}
      <Form />
      <Footer />
    </>
  );
};

export default Project;
