import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LifeAtManit = () => {
  const features = [
    {
      title: "Events",
      image: "/event.webp",
      description:
        "Vibrant cultural & technical events like workshops, hackathons, and seminars.",
    },
    {
      title: "Clubs",
      image: "/clubs.png",
      description:
        "Diverse clubs for coding, robotics, arts, music, drama, literature, and more.",
    },
    {
      title: "Hostels",
      image: "/hostel.jpeg",
      description:
        "Comfortable hostels with a friendly and collaborative living environment.",
    },
    {
      title: "Sports",
      image: "/sports.jpeg",
      description:
        "Excellent facilities for football, cricket, basketball, badminton, and athletics.",
    },
    {
      title: "Canteens",
      image: "/canteen.jpeg",
      description:
        "Multiple canteens serving delicious and affordable meals for students.",
    },
    {
      title: "Festivals",
      image: "/festivals.jpeg",
      description:
        "Grand celebrations like Maffick, Technosearch, and other cultural fests.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative w-full bg-gray-50 py-16 px-6 md:px-12 overflow-hidden">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10"></div>

      {/* Animated Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[22rem] h-[22rem] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-8rem] right-[-6rem] w-[25rem] h-[25rem] bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-[30%] left-[55%] w-[15rem] h-[15rem] bg-gradient-to-r from-green-300 to-teal-400 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 border-4 border-blue-300 rounded-xl rotate-12 opacity-40"></div>
      <div className="absolute bottom-28 right-20 w-16 h-16 border-4 border-pink-300 rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold text-[#002147] mb-6"
          data-aos="fade-up"
        >
          Life at <span className="text-blue-600">MANIT</span>
        </h2>

        <p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Beyond academics, MANIT offers a vibrant student life with a balance of
          learning, fun, and holistic growth. Here’s a glimpse of what makes
          MANIT an unforgettable experience.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center overflow-hidden"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 100}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {/* Text */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#002147] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAtManit;
