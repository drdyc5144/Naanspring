import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { Button, Input } from "../../../Components/Common";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "123 Food Street, Lagos, Nigeria",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+234 800 123 4567",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "info@naanspring.com",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: "Mon-Fri: 8am - 6pm, Sat: 9am - 3pm",
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, color: "bg-blue-600", href: "#" },
    { icon: FaTwitter, color: "bg-blue-400", href: "#" },
    { icon: FaInstagram, color: "bg-pink-600", href: "#" },
    { icon: FaWhatsapp, color: "bg-green-500", href: "#" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">
          Have questions or feedback? We'd love to hear from you. Get in touch
          with us today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Send Us a Message
          </h2>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
            >
              Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Subject"
              name="subject"
              placeholder="Order inquiry, Support, etc."
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{info.title}</h4>
                    <p className="text-sm text-gray-500">{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`${social.color} p-3 rounded-full text-white hover:opacity-80 transition-opacity`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Find Us</h3>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <p className="text-gray-500">Map View</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
