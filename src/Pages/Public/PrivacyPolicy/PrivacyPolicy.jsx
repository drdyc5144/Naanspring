const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-gray-500 mt-2">Last updated: January 2026</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Naanspring. We respect your privacy and are committed to
            protecting your personal data. This privacy policy explains how we
            collect, use, and safeguard your information when you use our
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            We collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, delivery address
            </li>
            <li>
              <strong>Payment Information:</strong> Payment method details
              (processed securely)
            </li>
            <li>
              <strong>Usage Data:</strong> How you interact with our platform,
              browsing history
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              device type
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            We use your information to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>Process and deliver your orders</li>
            <li>Communicate with you about orders and updates</li>
            <li>Improve our products and services</li>
            <li>Send promotional offers (with your consent)</li>
            <li>Personalize your shopping experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement appropriate security measures to protect your personal
            information. All payment transactions are encrypted and processed
            through secure payment gateways. However, no method of transmission
            over the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Sharing Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted partners who
            assist us in operating our platform, delivering orders, or providing
            services, subject to confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Cookies
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. You can manage cookie preferences
            in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this privacy policy from time to time. We will notify
            you of any material changes by posting the new policy on this page
            with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            9. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this privacy policy, please contact
            us at:
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

export default PrivacyPolicy;
