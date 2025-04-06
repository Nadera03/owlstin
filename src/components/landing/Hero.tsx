import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
export default function Hero() {
  const [animateIn, setAnimateIn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-magical-deep-purple/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-magical-enchanted/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-magical-glowing-teal/10 rounded-full filter blur-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <div className={`transition-all duration-1000 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Owl Logo */}
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-magical-glowing-teal/20 rounded-full animate-pulse"></div>
            <img alt="Owlstin" className="w-full h-full relative z-10 animate-float" onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDREREREIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
          }} src="/lovable-uploads/1407c5df-d2eb-4632-9fe0-79f2fd9d015f.png" />
          </div>
          
          {/* Hero Title */}
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Your AI-Powered Career Copilot</h1>
          
          {/* Subtitle */}
          <p className="text-magical-starlight/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            <span className="text-magical-glowing-teal">Owlstin</span> harnesses the power of AI to match your skills with job requirements, revealing your path to professional enchantment.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/job-seeker">
              <Button size="lg" className="magical-button group text-lg">
                <span>Start Your Journey</span>
                <div className="absolute inset-0 bg-magical-glowing-teal/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
            </Link>
            <Link to="/recruiter">
              <Button variant="outline" size="lg" className="border-magical-glowing-teal/50 hover:border-magical-glowing-teal/80 text-magical-starlight hover:bg-magical-glowing-teal/5 text-lg">
                For Recruiters
              </Button>
            </Link>
          </div>
          
          {/* Magic Orbs */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 opacity-30 floating-orb hidden lg:block"></div>
          <div className="absolute bottom-1/3 -right-10 w-24 h-24 opacity-20 floating-orb hidden lg:block" style={{
          animationDelay: "-2s"
        }}></div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToFeatures} aria-label="Scroll down">
            <ArrowDown className="text-magical-glowing-teal w-6 h-6" />
          </button>
        </div>
      </div>
    </section>;
}