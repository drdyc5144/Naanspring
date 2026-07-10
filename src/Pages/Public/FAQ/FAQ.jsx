import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order, simply browse our shop, add items to your cart, proceed to checkout, enter your delivery details, and complete payment. You'll receive a confirmation email with your order details.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments via bank transfer, credit/debit cards, and mobile money. All payments are securely processed through our payment gateway.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 24-48 hours within major cities, and 48-72 hours for other locations. You'll receive a tracking number once your order ships.",
    },
    {
      question: "Do you offer returns or refunds?",
      answer:
        "Yes, we offer a 7-day return policy on all products. If you're not satisfied with your purchase, please contact our support team for assistance.",
    },
    {
      question: "How do I track my order?",
      answer:
        'You can track your order by logging into your account and visiting the "Orders" section. You\'ll also receive tracking updates via email and SMS.',
    },
    {
      question: "Do you deliver outside Lagos?",
      answer:
        "Yes, we deliver to all states across Nigeria. Delivery times and costs may vary depending on your location.",
    },
    {
      question: "What if my order arrives damaged?",
      answer:
        "If your order arrives damaged, please take photos and contact our customer service within 24 hours of delivery. We'll arrange for a replacement or refund.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. Contact our support team immediately for assistance.",
    },
  ];

  const toggleFAQs = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 mt-2">
          Find answers to commonly asked questions about Naanspring
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQs(index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0 ml-4" />
              ) : (
                <FaChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Still have questions? */}
      <div className="bg-primary-50 rounded-2xl p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Still Have Questions?
        </h3>
        <p className="text-gray-600 mt-2">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:info@naanspring.com"
            className="px-6 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Email Support
          </a>
          <a
            href="/contact"
            className="px-6 py-2 border border-primary-800 text-primary-800 rounded-lg hover:bg-primary-800 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
