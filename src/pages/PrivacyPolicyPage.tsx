
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Navbar />
      
      <div className="container mx-auto max-w-4xl px-4 pt-24 pb-16">
        <h1 className="text-4xl font-cinzel font-bold mb-8 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-magical-starlight/80">Last Updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">Introduction</h2>
          <p>
            At Owlstin, we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy describes how we collect, use, and disclose your information when you use our services.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">Information We Collect</h2>
          <p>
            We may collect several types of information from and about users of our services, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Personal information such as name, email address, and contact information.</li>
            <li>Information about your career goals, skills, and job preferences.</li>
            <li>Resume and job application data.</li>
            <li>Information about your interactions with our platform.</li>
            <li>Technical information including IP address, browser type, and device information.</li>
          </ul>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>To provide and improve our services.</li>
            <li>To personalize your experience with our platform.</li>
            <li>To match you with relevant job opportunities.</li>
            <li>To communicate with you about our services.</li>
            <li>To analyze usage patterns and improve our platform.</li>
          </ul>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">Third-Party Services</h2>
          <p>
            Our services may integrate with or contain links to third-party websites and services. We are not responsible for the practices employed by these third-party websites or services.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">Changes to Our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@owlstin.io" className="text-magical-glowing-teal hover:underline">privacy@owlstin.io</a>.
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/" className="text-magical-glowing-teal hover:underline">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
