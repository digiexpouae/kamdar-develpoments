import React from "react";

const Section4 = () => (
  <section
    className="relative w-full h-[70vh]"
    style={{
      backgroundImage: `url('/assets/your-section4-bg.png')`, // fixed here
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/20" /> {/* Optional: subtle overlay */}
    <div className="absolute top-0 left-0 z-10 flex flex-col items-start p-8 md:p-12">
      <h1
        className="text-white text-3xl md:text-5xl font-light leading-tight mb-6"
        style={{ fontFamily: 'Luxerie, sans-serif' }}
      >
        SOPHISTICATED LIVING IN<br />
        THE HEART OF JVC
      </h1>
      <button className="bg-white text-black px-6 py-2 rounded shadow font-medium hover:bg-gray-200 transition">
        Explore More
      </button>
    </div>
  </section>
);

export default Section4;
