import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const dummyBlogs = [
  {
    slug: 'why-jvc-is-one-of-dubais-most-desirable-places-to-live-and-invest',
    title: 'Why JVC is One of Dubai’s Most Desirable Places to Live and Invest?',
    excerpt:

<>Why JVC is One of Dubai’s Most Desirable Places to Live and Invest?
 Designed as a thoughtfully curated neighborhood, JVC offers the perfect blend of convenience and comfort, bringing together modern living, working and leisure in one cohesive community.<br />
With apartments, villas, and townhouses nestled among beautiful parks and green spaces, and with Circle Mall at its heart, JVC delivers a complete lifestyle. Residents enjoy not only convenient access to retail and dining, but also schools, nurseries, healthcare facilities, and a wide range of leisure options, from sports courts and fitness centers to playgrounds and community events making it a truly self-sufficient neighborhood where everything you need is within reach.
A Thriving Community with Exceptional Connectivity
<br />
One of JVC’s most attractive qualities is its accessible location. The community sits at the crossroads of three of Dubai’s most important highways; Sheikh Mohammed bin Zayed Road, Al Khail Road, and Hessa Street ensuring residents have access across the city. From JVC, key destinations such as Dubai Marina, Downtown Dubai, Business Bay, and Dubai Hills are just short rides away. This accessibility, combined with the area’s tranquil suburban charm, makes JVC a rare neighbourhood gem of connectivity and community living.
Future Prospects: Growth and Long-Term Value
Looking ahead, JVC is set to benefit from major infrastructure improvements that will continue to elevate its market appeal. A series of new bridges and entry points are being constructed, including a major new access from Al Khail Road, which will dramatically improve traffic flow into and out of the community. These upgrades are part of a wider AED 6 billion agreement between Dubai Holding and the RTA, aimed at reducing internal travel times by up to 70% and strengthening JVC’s position as one of Dubai’s most well-connected neighborhoods.
As accessibility improves and demand continues to rise, property values in JVC are expected to climb steadily. Investors are drawn by its strong rental yields (already averaging between 6.5% and 8%) while families value the complete lifestyle it provides. Its location near retail hubs like Mall of the Emirates and Dubai Hills Mall, coupled with its own growing ecosystem of schools, healthcare centers, and leisure facilities, ensures long-term desirability.
The Perfect Place to Call Home
<br />
In every sense, JVC offers the best of both worlds: the vibrancy and convenience of city living paired with the peace and comfort of a family-friendly community. With its ongoing infrastructure improvements, unparalleled connectivity, and carefully planned amenities, Jumeirah Village Circle is not just one of Dubai’s most sought-after communities today but it is also one of its most promising neighborhoods for the future.</>,
    mainImage: '/assets/Blog 1 Image (JVC).jpg',
  },
  
    {
    slug: 'behind-the-scenes-designing-105-residences',
         title: 'Behind the Scenes: Designing 105 Residences',
      excerpt:
      <>What is 105 Residences?
105 Residences by Kamdar is our latest boutique luxury development located in the heart of Jumeriah Village Circle, Dubai. Conceived as an intimate, exclusive project, it features only 105 units, ensuring privacy and distinction in one of the city’s most dynamic communities. Under construction by Luxedesign (LDV), the project represents the culmination of Kamdar’s four decades of expertise across three continents, bringing a legacy of excellence to Dubai’s real estate market.
How Was 105 Residences Designed?
Every element of 105 Residences was meticulously crafted by an award-winning architect to embody sophistication and elegance. The design team placed emphasis on timeless luxury, which is being brought to life through high-quality materials carefully sourced from Casamia, such as Calacatta marble and rich wood tones, to create interiors that are as durable as they are elegant. This dedication to detail ensures that every apartment is a sanctuary of comfort and style.
<br />
Floor Plans
The development offers a carefully curated selection of studio, one-bedroom, and two-bedroom apartments, each with spacious layouts and refined finishes. Studios are designed for modern urban living with smart, functional layouts, while one-bedroom units balance elegance with practicality. For families, two-bedroom apartments provide ample space and comfort. In addition, a limited number of residences feature private pools on their balconies, offering residents a rare and exclusive luxury experience.
Amenities Selected<br />
At 105 Residences, the amenities were chosen to cater to a wide range of lifestyles, ensuring that every resident finds something meaningful within the community. Highlights include a rooftop open-air cinema, yoga deck, Zen garden, and barbecue area for leisure and relaxation. Wellness is at the forefront with a state-of-the-art fitness studio, infinity pool, and multi-purpose sports court. Families are equally catered to, with children’s play areas built into the podium level. Each space has been designed not just for function but to enhance the everyday lifestyle of residents.
A Statement of Luxury Living
The balance between privacy, community, and lifestyle makes 105 Residences a one-of-a-kind development. By combining boutique exclusivity with world-class amenities, Kamdar ensures that residents experience both tranquility and vibrancy within their home environment. Whether it’s relaxing on the rooftop, exercising in the gym, or hosting friends at the barbecue area, every detail was designed to reflect the modern Dubai lifestyle while maintaining an air of timeless sophistication.
More than just a residential project, 105 Residences is a statement of boutique luxury, created for those who value quality, exclusivity, and thoughtful design. From its architectural brilliance to its hand-selected finishes and lifestyle-focused amenities, it redefines what it means to live well in Jumeirah Village Circle. For families, professionals, and investors alike, this development offers not just a home but a new benchmark in boutique living in Dubai.
</>,
   mainImage: '/assets/Blog 2 image.jpg',},
    
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
