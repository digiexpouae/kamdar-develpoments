import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const dummyBlogs = [
  {
    slug: 'luxury-apartments-dubai-marina',
    title: 'Luxury Apartments in Dubai Marina',
    excerpt:
      'Dubai Marina stands as one of the most iconic waterfront destinations in the UAE, offering a luxurious lifestyle surrounded by high-end retail, fine dining, and stunning marina views. The area is renowned for its ultra-modern high-rise apartment towers, each designed with elegance and equipped with world-class amenities including infinity pools, state-of-the-art gyms, concierge services, and direct marina access. These luxury apartments in Dubai Marina appeal to both residents and investors due to their strong rental demand and consistent capital appreciation. With convenient access to Sheikh Zayed Road, Dubai Metro, and major business districts, Marina living offers the perfect balance between work and leisure. Whether you\'re seeking a high-yield investment or a sophisticated urban lifestyle, Dubai Marina delivers unmatched value and prestige. From studio units to spacious penthouses, each property is crafted to meet the expectations of discerning buyers from around the world. As one of Dubai’s most photographed skylines, Dubai Marina continues to attract global attention for its lifestyle offerings and premium real estate opportunities. Discover the modern luxury and strategic advantage of owning property in one of Dubai’s most desirable waterfront communities.',
    mainImage: '/assets/3.jpg',
  },
  
    {
      slug: 'off-plan-investment-opportunities',
      title: 'Off-Plan Investment Opportunities in Downtown Dubai',
      excerpt:
        'Downtown Dubai has solidified its position as one of the most prestigious and profitable locations for off-plan property investment in the UAE. With iconic landmarks like the Burj Khalifa, Dubai Mall, and Dubai Opera at its core, this bustling district draws high-net-worth individuals, expatriates, and global investors alike. Off-plan investment opportunities in Downtown Dubai offer significant advantages, including competitive entry prices, flexible payment plans, and the potential for high capital appreciation before project completion. Developers are rolling out innovative projects ranging from branded residences to ultra-modern smart homes, all designed to meet the growing demand for luxury living. These off-plan properties also attract strong rental demand, ensuring consistent ROI post-handover. As Expo 2020 legacies and infrastructure improvements continue to impact the area positively, investing in off-plan real estate in Downtown Dubai presents both short-term and long-term gains. Whether you\'re a first-time investor or expanding your portfolio, Downtown Dubai offers a wealth of opportunities in a globally recognized address. Explore what’s next in Dubai’s real estate future — and invest early to reap the maximum benefits.',
      mainImage: '/assets/2.png',
    },
    {
      slug: 'jvc-villas-rise-in-demand',
      title: 'JVC Villas: A Rising Choice for Families',
      excerpt: 'Jumeirah Village Circle (JVC) is rapidly emerging as one of Dubai’s most sought-after residential communities, especially for families seeking spacious, affordable, and serene living. The growing popularity of JVC villas is fueled by their generous layouts, contemporary designs, and proximity to parks, schools, and everyday essentials.With its strategic location near Al Khail Road and Sheikh Mohammed Bin Zayed Road, JVC offers easy connectivity to Dubai’s major hubs while maintaining a peaceful, community-centric atmosphere. The villas are ideal for families looking for a blend of privacy and social living, surrounded by landscaped gardens, jogging tracks, and community playgrounds.Another major factor contributing to the rise in demand for JVC villas is the strong return on investment and increasing rental yields. Whether you\'re a homeowner or investor, JVC stands out as a smart and future-ready choice.From 3 to 5-bedroom options, JVC villas provide flexible layouts that cater to growing families and modern lifestyles. With ongoing developments and infrastructure enhancements, JVC is fast becoming a favorite among family-oriented buyers who want both comfort and convenience in the heart of New Dubai.Explore why more families are moving into JVC — where space, value, and lifestyle meet.',
      mainImage: '/assets/105/1.png',
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
      <div className="min-h-screen bg-black  max-w-8xl  text-white pt-40 px-6 lg:px-20 pb-20">
        <h1 className="text-4xl lg:text-5xl text-center font-bold mb-6">{blog.title}</h1>
        <img
          src={blog.mainImage}
          alt={blog.title}
          className="w-[800px] h-[500px] object-cover m-auto rounded-2xl mb-10"
        />
        <p className="text-lg text-gray-300 leading-relaxed   mx-auto text-left">{blog.excerpt}</p>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
