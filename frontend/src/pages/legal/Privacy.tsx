import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";

const Privacy = () => {
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <main className="max-w-4xl  text-gray-900 dark:text-gray-100 mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to the AI Calculator app. We are committed to protecting
            your personal information and your right to privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our AI Calculator application.
          </p>

          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when using
            the AI Calculator app. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Calculation history</li>
            <li>User preferences</li>
            <li>Device information</li>
          </ul>

          <h2 className="text-xl font-semibold">
            3. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Develop new features and functionality</li>
            <li>Understand how you use our app</li>
            <li>Respond to your comments and questions</li>
          </ul>

          <h2 className="text-xl font-semibold">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect the security of your personal information. However, please
            note that no method of transmission over the internet or electronic
            storage is 100% secure.
          </p>

          <h2 className="text-xl font-semibold">
            5. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>

          <h2 className="text-xl font-semibold">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="font-semibold">privacy@aicalculator.com</p>
        </section>
      </main>
    </div>
  );
};

export default Privacy;
