import React from 'react'
import { useEffect } from "react";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Section1 from "../../common/section1/Section1"
import Section4 from "../../common/section4/Section4"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from '../../common/form/Form'
import Section5 from '../../common/section5/Section5'
import Section2 from './section2/Section2'
import Section3 from './section3/Section3'
import Chooseus from '../../common/chooseus/Chooseus'
import Section3Home from '../home/section3/Section3'

const About = () => {

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
                <Section1
            text={<>BUILT FOR GENERATIONS.<br />CRAFTED WITH PURPOSE</>}
            backgroundImage="/assets/aboutimages/about_header.jpg"
            mobileBackgroundImage="/assets/aboutmob.png" 
         />
            <Section2 backgroundImage={'/assets/aboutimages/about_header.jpg'} /> 
          <Section3 />
          <Chooseus />
          <Section3Home bgImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+XxKQAAAAASUVORK5CYII="/>
          <Form />
        <Footer />
    </>
  )
}

export default About
 