import { motion } from 'framer-motion';
import Hotels from './Hotels';
import Gallery from './Gallery';
import Weather from './Weather';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url('/src/assets/images/home_bg.jpg')` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/0 to-black opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/0 to-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-1 container mx-auto text-center text-white py-20 font-Playfair">
          <motion.h1
            className="text-5xl font-bold mb-4 tracking-wider md:text-6xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Travel Companion
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 tracking-wider p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Your ultimate tool to plan your perfect trip.
          </motion.p>

          {/* Statistics Buttons */}
          <div className="flex flex-wrap justify-center gap-4 font-bold">
            {[
              { number: '12K+', label: 'Successful Trips' },
              { number: '2K+', label: 'Regular Clients' },
              { number: '15+', label: 'Years of Experience' },
            ].map((stat, index) => (
              <motion.button
                key={index}
                className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-accent transition duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl">{stat.number}</div>
                <div className="text-sm">{stat.label}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <Hotels />
      <Gallery />
      <Weather />
      <Testimonials />
    </>
  );
};

export default Home;
