
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

  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6 text-center">
            About Owlstin
          </h1>
          
          <div className="magical-card p-8 rounded-xl mb-12">
            <p className="text-lg mb-6">
              Founded in 2023, Owlstin emerges from the convergence of advanced artificial intelligence and career development expertise, creating a powerful nexus that transforms how talent and opportunity connect in the modern professional landscape.
            </p>
            
            <p className="text-lg mb-6">
              Our distinguished team of AI researchers, career strategists, and industry veterans have crafted a sophisticated platform that transcends traditional job matching by identifying crucial skill alignments and providing strategic pathways for professional advancement.
            </p>
            
            <p className="text-lg">
              At Owlstin, we hold the conviction that every professional deserves a career trajectory that resonates with their innate talents. Through our proprietary algorithms and insightful guidance, we illuminate the path toward exceptional career fulfillment.
            </p>
          </div>
          
          <h2 className="text-3xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent mb-6 text-center">
            Our Mission
          </h2>
          
          <div className="magical-card p-8 rounded-xl mb-12">
            <p className="text-lg text-center italic">
              "To harness the transformative power of AI to forge connections between exceptional talent and ideal opportunities, empowering professionals to thrive in an evolving landscape while enabling organizations to discover their perfect match."
            </p>
          </div>
          
          <h2 className="text-3xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent mb-6 text-center">
            The Team Behind Owlstin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="magical-card p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-magical-glowing-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-2">Aria Chen</h3>
              <p className="text-magical-starlight/70">Founder & CEO</p>
              <p className="text-magical-starlight/70 mt-3">
                Former AI Research Director at LinkedIn with expertise in neural networks and career trajectory optimization
              </p>
            </div>
            
            <div className="magical-card p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-magical-glowing-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🧙‍♂️</span>
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-2">Marcus Wells</h3>
              <p className="text-magical-starlight/70">CTO</p>
              <p className="text-magical-starlight/70 mt-3">
                Distinguished AI researcher specializing in advanced natural language processing and comprehensive skills taxonomy architecture
              </p>
            </div>
            
            <div className="magical-card p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-magical-glowing-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍🎓</span>
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-2">Elena Torres</h3>
              <p className="text-magical-starlight/70">Head of Learning</p>
              <p className="text-magical-starlight/70 mt-3">
                Former Director of Educational Innovation with 15+ years pioneering adaptive learning systems and professional development frameworks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
