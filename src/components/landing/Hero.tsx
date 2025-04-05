
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

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Magical mist */}
        <div className="absolute inset-0 mist-field"></div>
        
        {/* Blood drips */}
        <div className="absolute top-0 left-1/4 blood-drip" style={{animationDelay: "0.5s"}}></div>
        <div className="absolute top-0 right-1/3 blood-drip" style={{animationDelay: "1.2s"}}></div>
        <div className="absolute top-0 left-2/3 blood-drip" style={{animationDelay: "0.8s"}}></div>
        
        {/* Gothic window shapes */}
        <div className="absolute top-40 left-10 w-32 h-64 border border-castlevania-gold/20 castle-window opacity-20 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-32 h-64 border border-castlevania-gold/20 castle-window opacity-20 hidden lg:block"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <div className={`transition-all duration-1000 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Owl Logo with torch effect */}
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 torch-light"></div>
            <img 
              alt="Owlstin" 
              className="w-full h-full relative z-10" 
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDREREREIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
              }} 
              src="/lovable-uploads/1407c5df-d2eb-4632-9fe0-79f2fd9d015f.png" 
            />
          </div>
          
          {/* Hero Title with blood-glow effect */}
          <div className="blood-glow mb-6">
            <h1 className="font-vampire text-5xl md:text-7xl font-bold text-castlevania-parchment animate-shimmer bg-[length:200%_auto]">
              Unlock Your Career Magic
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-castlevania-parchment text-lg md:text-xl max-w-2xl mx-auto mb-10">
            <span className="text-castlevania-gold">Owlstin</span> harnesses the power of AI to match your skills with job requirements, revealing your path to professional enchantment.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/job-seeker">
              <Button size="lg" className="castlevania-button group text-lg">
                <span>✨ Reveal My Match</span>
              </Button>
            </Link>
            <Link to="/recruiter">
              <Button variant="outline" size="lg" className="border-castlevania-gold/50 hover:border-castlevania-gold/80 text-castlevania-parchment hover:bg-castlevania-blood/10 text-lg">
                For Recruiters
              </Button>
            </Link>
          </div>
          
          {/* Flame orbs */}
          <div className="absolute top-1/4 -left-20 w-12 h-12 flame-orb hidden lg:block"></div>
          <div className="absolute bottom-1/3 -right-10 w-8 h-8 flame-orb hidden lg:block" style={{
            animationDelay: "-2s"
          }}></div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToFeatures} aria-label="Scroll down">
            <ArrowDown className="text-castlevania-gold w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
