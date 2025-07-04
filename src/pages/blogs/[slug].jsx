import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black text-white pt-40 text-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
        <Footer />
      </>
    );
  }

  const blog = dummyBlogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black text-white pt-40 text-center">
          <h1 className="text-3xl font-bold">Blog not found</h1>
          <p className="text-gray-400 mt-4">We couldn’t find the article you were looking for.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white pt-40 px-6 lg:px-20 pb-20">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">{blog.title}</h1>
        <img
          src={blog.mainImage}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-10"
        />
        <p className="text-lg text-gray-300 leading-relaxed">{blog.content}</p>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
