import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from 'next/router';

const dummyBlogs = [
  {
    slug: 'luxury-apartments-dubai-marina',
    title: 'Luxury Apartments in Dubai Marina',
    excerpt: 'Discover the modern high-rises offering world-class amenities in Dubai Marina.',
    mainImage: '/assets/3.jpg',
  },
  {
    slug: 'off-plan-investment-opportunities',
    title: 'Off-Plan Investment Opportunities in Downtown Dubai',
    excerpt: 'Explore off-plan real estate projects with high ROI potential.',
    mainImage: '/assets/2.png',
  },
  {
    slug: 'jvc-villas-rise-in-demand',
    title: 'JVC Villas: A Rising Choice for Families',
    excerpt: 'Jumeirah Village Circle is becoming a family favorite with spacious villas and green spaces.',
    mainImage: '/assets/1.png',
  },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setBlogs(dummyBlogs);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="w-full pt-40 mx-auto py-16 px-7 bg-black min-h-screen">
        <h1 className="text-5xl font-extrabold text-center text-white mb-4">Accomplish more, Together</h1>
        <p className="text-center text-gray-300 text-lg mb-12">Softuch blog is your knowledge center for everything remote.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-3 text-center text-white">Loading blogs...</div>
          ) : (
            blogs.map((blog) => (
              <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
                <div className="bg-[#23262F] rounded-3xl shadow-md overflow-hidden flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl border border-[#23262F] hover:border-white">
                  <div className="h-56 w-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    {blog.mainImage ? (
                      <img 
                        src={blog.mainImage} 
                        alt={blog.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="text-gray-400 text-center p-4">
                        <svg 
                          className="w-16 h-16 mx-auto mb-2 text-gray-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                        <span className="text-sm">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col p-6">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#CCAB64] transition-colors duration-200">
                      {blog.title}
                    </h2>
                    <p className="text-gray-300 text-base mb-4 flex-1">{blog.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div> 
      <Footer />
    </>
  );
};

export default Blogs;
