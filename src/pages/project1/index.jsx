'use client';
import { useEffect } from "react";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import Section1 from "../../common/section1/Section1";
import Section4 from "../../common/section4/Section4";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../contact/Form";
import Slide from "./Slide";
import Places from '../../common/places/place';
import Icons from '../../common/icons';

gsap.registerPlugin(ScrollTrigger);

const Project1 = () => {
  useEffect(() => {
    ScrollTrigger.normalizeScroll(true);

    const panels = gsap.utils.toArray(".panel:not(:first-child)");

    gsap.set(panels[0], { yPercent: 0, zIndex: 1 });
    gsap.set(panels, {
      yPercent: 100,
      zIndex: (i) => i + 2,
    });

    const scroll = `+=${panels.length * 100}%`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        endTrigger: "bottom bottom",
        end: `${scroll}vh`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    panels.forEach((panel) => {
      tl.to(panel, {
        yPercent: 0,
        ease: "none",
      }, "+=0.5");
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  const icons = [
    { img: '/assets/105/Vector.svg', name: 'Dubai Miracle Garden', distance: '10 minutes' },
    { img: '/assets/105/Vector2.svg', name: 'Dubai Marina Mall', distance: '15 minutes' },
    { img: '/assets/105/g2589.svg', name: 'Downtown & Dubai MAll', distance: '20 minutes' },
    { img: '/assets/105/vector4.svg', name: 'Al-Maktoum Airport', distance: '25 minutes' },
    { img: '/assets/105/vector4.svg', name: 'International Airport', distance: '30 minutes' },
  ];

  const markers = [
    { name: 'Mall of the Emirates', coordinates: [25.118009, 55.200367], icon: '/assets/105/Vector.svg' },
    { name: 'Dubai Marina', coordinates: [25.080562, 55.140911], icon: '/assets/105/Vector2.svg' },
    { name: 'Down Town', coordinates: [25.1951, 55.2744], icon: '/assets/105/Vector4.svg' },
  ];

  return (
    <>
      <Header />

      <Section1
        text={<>RESIDENCE BY KAMDAR</>}
        backgroundImage="/assets/105bg.png"
        mobileBackgroundImage="/assets/portfoliomob.png"
      />

      <Slide />

      {/* ✅ Start GSAP Panel Scroll Section */}
      <div className="hero relative">
        <div className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10 bg-cover bg-center">
          <Section4
            heading={<>Studio Apartments</>}
            className=""
            desktopBackground={'/assets/105/1.png'}
            text={<>Size Range: 394 to 468 sq. ft. Layout Variations: At least two types</>}
            mobileBackground={'/assets/105/mob1.png'}
            btntext={'Explore Now'}
          />
        </div>

        <div className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-0 bg-cover bg-center">
          <Section4
            heading={<>ONE BED APARTMETNS</>}
            className=""
            desktopBackground={'/assets/105/2.png'}
            mobileBackground={'/assets/105/mob2.png'}
            btntext={'Explore Now'}
          />
        </div>

        <div className="panel inset-0 absolute w-full h-[100dvh] md:h-[100vh] z-10 bg-cover bg-center">
          <Section4
            heading={<>TWO BED APARTMETNS</>}
            className=""
            desktopBackground={'/assets/105/3.png'}
            mobileBackground={'/assets/105/mob3.png'}
            btntext={'Explore Now'}
          />
        </div>
      </div>
      {/* ✅ End Panel Scroll Section */}

      {/* Other Sections */}
      <section className="bg-black py-10">
        <div className="text-center mt-10 mb-10 md:px-5 px-2">
          <h2 className="text-5xl md:text-7xl font-bold text-white font-luxerie">
            Connected to<br /> Everything That Matters
          </h2>
          <p className="text-white text-sm md:text-md font-base font-lexend mt-4 max-w-xl mx-auto">
            Enjoy seamless access to Dubai’s top destinations — from malls and marinas to airports and iconic landmarks — all just minutes from your doorstep.
          </p>
        </div>

        <Places center_position={[25.0631, 55.2471]} name={'105 Residences'} Main_marker={'105 Residences'} markers={markers} />
        <Icons icons={icons} />
      </section>

      <Form />
      <Footer />
    </>
  );
};

export default Project1;
