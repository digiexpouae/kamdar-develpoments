'use client';
// import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import arrow1 from '../../../public/assets/arrow1.png'
import arrow2 from '../../../public/assets/arow2.png'
const jobList = [
  { title: 'HR Executive', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec turpis ut urna maximus fermentum ac vel tortor. Phasellus tristique varius elit, et viverra nulla tristique sed.', button: true },
  { title: 'Sales Executive' },
  { title: 'Admin Support' },
  { title: 'Project Manager' },
];

export default function OpenPositions() {
  return (
    <section className="bg-[#0F0D0D] text-white px-4 py-12 w-full flex flex-col items-center justify-center relative overflow-hidden">

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10" style={{fontFamily:'Luxerie, sans-serif'}}>Open Positions</h2>

        {/* Job Listings */}
        <div className="w-full max-w-2xl rounded-2xl bg-[#5c59596c] p-6 md:p-12 shadow-lg relative z-20">
        <div className="flex flex-col gap-3">
          {jobList.map((job, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/20 pb-6 ${
                index === 0 ? 'mb-4' : 'pt-2'
              }`}
            >
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 font-lexend" style={{fontFamily:'Luxerie, sans-serif'}}>{job.title}</h3>
                {job.description && (
                  <p className="text-sm md:text-base text-white/70 mb-4 w-[70%]" style={{fontFamily:'lexend'}}>{job.description}</p>
                )}
                {job.button && (
                  <button className=" text-black text-sm px-5 py-2 rounded-full  hover:bg-[#f0dba9] transition-all"     style={ {background: 'linear-gradient(90deg, #CCAB64 0%, #FAECC9 100%)'}}
>
                    Apply Now
                  </button>
                )}
              </div>

              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"   style={{
    background: 'linear-gradient(90deg, #CCAB64 0%, #FAECC9 100%)',
  }}>
                <Image
  src={index === 0 ? arrow1 : arrow2}
  alt="Arrow"
  className="w-3 h-3"
  width={14}
  height={14}
/>
            </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='career-logo'>
           <Image src="/assets/logo morr.png" alt="Logo" width={500} height={500} />
      </div>
    </section>
  );
}
