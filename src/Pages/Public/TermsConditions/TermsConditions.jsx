const TermsConditions = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
        <p className="text-gray-500 mt-2">Last updated: January 2026</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            By using Naanspring, you agree to comply with these terms and
            conditions. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Account Registration
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            To use our services, you must:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>Be at least 18 years old</li>
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Orders and Payments
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>All orders are subject to availability</li>
            <li>Prices are subject to change without notice</li>
            <li>Payment must be made in full at the time of ordering</li>
            <li>We reserve the right to refuse or cancel orders</li>
            <li>You will receive confirmation of your order via email</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Delivery
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>Delivery times are estimates and not guaranteed</li>
            <li>We deliver to addresses within Nigeria</li>
            <li>You must provide accurate delivery information</li>
            <li>Delivery costs are calculated at checkout</li>
            <li>Risk of loss passes to you upon delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Returns and Refunds
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>We offer a 7-day return policy on products</li>
            <li>Products must be unused and in original packaging</li>
            <li>You are responsible for return shipping costs</li>
            <li>Refunds are processed within 5-7 business days</li>
            <li>Perishable items cannot be returned</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Product Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We strive to ensure all product information is accurate. However, we
            do not warrant that product descriptions, images, or other content
            are error-free. Colors may vary based on display settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Intellectual Property
          </h2>
          <p className="text-gray-600 leading-relaxed">
            All content on Naanspring, including text, graphics, logos, and
            images, is our property or licensed to us. You may not use,
            reproduce, or distribute any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Naanspring is provided "as is" without warranties. To the maximum
            extent permitted by law, we are not liable for any damages arising
            from the use of our platform or products.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            9. Governing Law
          </h2>
          <p className="text-gray-600 leading-relaxed">
            These terms are governed by the laws of Nigeria. Any disputes shall
            be resolved in the courts of Lagos, Nigeria.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            10. Changes to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to update these terms at any time. Changes
            become effective immediately upon posting. Your continued use of the
            platform constitutes acceptance of updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            11. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about these terms, please contact us:
          </p>
          <div className="mt-2 text-gray-600">
            <p>Email: info@naanspring.com</p>
            <p>Phone: +234 800 123 4567</p>
            <p>Address: 123 Food Street, Lagos, Nigeria</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
