
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const TermsOfServicePage = () => {
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
          Terms of Service
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-magical-starlight/80">Last Updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Owlstin platform, you agree to be bound by these Terms of Service. If you do not agree to these Terms, you may not access or use our services.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">2. Description of Services</h2>
          <p>
            Owlstin provides an AI-powered platform for career development, job matching, and skill enhancement. Our services include resume analysis, job fit scoring, personalized learning recommendations, and more.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">3. User Accounts</h2>
          <p>
            To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">4. User Content</h2>
          <p>
            You retain all rights to the content you submit to our platform, including resumes, personal information, and other materials. By submitting content, you grant Owlstin a non-exclusive, worldwide license to use, store, and process this content for the purpose of providing our services.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">5. Prohibited Uses</h2>
          <p>
            You agree not to use our platform:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>In any way that violates applicable laws or regulations.</li>
            <li>To upload or transmit any material that infringes on intellectual property rights.</li>
            <li>To distribute malware or other harmful content.</li>
            <li>To attempt to gain unauthorized access to our systems.</li>
            <li>To misrepresent your identity or qualifications.</li>
          </ul>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">6. Limitation of Liability</h2>
          <p>
            Owlstin and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">7. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting a notice on our platform or sending an email. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">8. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the state of California, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-cinzel mt-8 mb-4 text-magical-glowing-teal">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@owlstin.io" className="text-magical-glowing-teal hover:underline">legal@owlstin.io</a>.
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/" className="text-magical-glowing-teal hover:underline">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
