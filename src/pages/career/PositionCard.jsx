// components/JobCard.tsx
const JobCard = ({head,text}) => {
    return (
<div style={{ border: '1px solid black' }} className=" w-sm md:w-lg rounded-xl bg-white shadow-sm p-[28px] " >
<div className="md:pl-4 text-black">
          <h2 className="text-xl  mb-4">{head}</h2>
  
          <div className="flex flex-wrap gap-2 mb-4">
            {["Dubai", "Full-time", "On-site", "Sales"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm border border-black rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
  
          <p className="text-sm mb-6">
         {text}
          </p>
  
          <button className=" cursor-pointer w-[50%] bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Apply Now
          </button>
        </div>
      </div>
    );
  };
  
  export default JobCard;
  