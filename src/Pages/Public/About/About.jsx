import { motion } from "framer-motion";
import {
  FaUsers,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaSmile,
  FaMedal,
} from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: FaLeaf,
      title: "Quality First",
      description:
        "We source only the finest quality foodstuff from trusted suppliers.",
    },
    {
      icon: FaUsers,
      title: "Customer Focused",
      description: "Our customers are at the heart of everything we do.",
    },
    {
      icon: FaTruck,
      title: "Reliable Delivery",
      description:
        "We deliver your orders promptly and safely to your doorstep.",
    },
    {
      icon: FaShieldAlt,
      title: "Trust & Transparency",
      description:
        "We believe in honest pricing and transparent business practices.",
    },
    {
      icon: FaSmile,
      title: "Satisfaction Guaranteed",
      description:
        "Your satisfaction is our priority. We stand behind our products.",
    },
    {
      icon: FaMedal,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service.",
    },
  ];

  const stats = [
    { value: "50+", label: "Product Categories" },
    { value: "500+", label: "Happy Customers" },
    { value: "1000+", label: "Orders Delivered" },
    { value: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800"
        >
          About Naanspring
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto"
        >
          Your trusted online foodstuff marketplace, connecting you with quality
          products from across the country.
        </motion.p>
      </section>

      {/* Story Section */}
      <section className="bg-white rounded-2xl shadow-sm p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2024, Naanspring was born from a simple idea: to make
              quality foodstuff accessible to everyone, everywhere in Nigeria.
              We saw a gap in the market for a reliable, convenient, and
              trustworthy online foodstuff marketplace.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we're proud to serve thousands of customers across the
              country, connecting them with the best food products from various
              regions. Our commitment to quality, reliability, and customer
              satisfaction remains at the core of everything we do.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">🌾</span>
                <p className="text-primary-800 font-semibold mt-2">
                  Fresh. Natural. Trusted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary-800">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-800">{value.title}</h4>
              <p className="text-sm text-gray-500 mt-2">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
