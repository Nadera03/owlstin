import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
export default function AboutPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  return <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6 text-center">
            About Owlstin
          </h1>
          
          <div className="magical-card p-8 rounded-xl mb-12">
            <p className="text-lg mb-6">Owlstin was founded in 2025 with a singular vision: to bridge the gap between job seekers' skills and employers' needs through the power of AI and data science.</p>
            
            <p className="text-lg mb-6">
              Our team of AI specialists, career coaches, and recruitment experts came together to create a platform that not only identifies skill gaps but provides actionable pathways to close those gaps.
            </p>
            
            <p className="text-lg">
              We believe that everyone deserves a fulfilling career, and with the right guidance, anyone can transform their professional journey. Owlstin is that magical guide, illuminating the path to career success.
            </p>
          </div>
          
          <h2 className="text-3xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent mb-6 text-center">
            Our Mission
          </h2>
          
          <div className="magical-card p-8 rounded-xl mb-12">
            <p className="text-lg text-center italic">
              "To empower individuals with the insights and resources they need to thrive in an ever-evolving job market, while helping organizations find their perfect talent match."
            </p>
          </div>

          <h2 className="text-3xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent mb-6 text-center">
            Our AI Assistant
          </h2>
          
          <div className="magical-card p-8 rounded-xl mb-12">
            <p className="text-lg text-center mb-6">
              Meet our state-of-the-art AI career assistant, ready to help you navigate your career journey 24/7. Ask about skills, jobs, or career advice anytime.
            </p>
            <p className="text-lg text-center">
              The AI assistant uses advanced natural language processing to provide personalized career guidance based on your unique profile and goals.
            </p>
          </div>
          
          <h2 className="text-3xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent mb-6 text-center">
            The Team Behind Owlstin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 rounded">
            <div className="magical-card p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-magical-glowing-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-2">Nadera. AI</h3>
              <p className="text-magical-starlight/70">Founder & CEO</p>
              
            </div>
            
            <div className="magical-card p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-magical-glowing-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-2">Dr. Morgan Lee</h3>
              <p className="text-magical-starlight/70">Chief Data Scientist</p>
              
            </div>
            
            <div className="magical-card p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-magical-glowing-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍🎓</span>
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-2">Jamie Rivera</h3>
              <p className="text-magical-starlight/70">Career Development Lead</p>
              <p className="text-magical-starlight/70 mt-3">
                15+ years experience in career coaching and recruitment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}