
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
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
      {/* Enhanced Magical Background with Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dark gradient overlay with vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-wizardry-deep-crimson/80 via-wizardry-deep-crimson to-black opacity-60"></div>
        
        {/* Starry background */}
        <div className="absolute inset-0 starry-field"></div>
        
        {/* Golden light rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_rgba(0,0,0,0)_70%)]"></div>
        
        {/* Magical mist */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-wizardry-crimson/30 to-transparent"></div>
        
        {/* Magic particles */}
        {Array.from({length: 15}).map((_, i) => (
          <div 
            key={i} 
            className="absolute magical-particles" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
        
        {/* Magical window shapes */}
        <div className="absolute top-40 left-10 w-32 h-64 border border-wizardry-gold/20 magical-window opacity-20 hidden lg:block bg-wizardry-purple/10 backdrop-blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-32 h-64 border border-wizardry-gold/20 magical-window opacity-20 hidden lg:block bg-wizardry-purple/10 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <div className={`transition-all duration-1000 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Owl Logo with enhanced sparkle effect */}
          <div className="w-40 h-40 mx-auto mb-10 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-wizardry-gold/30 via-wizardry-gold/10 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 sparkle-light"></div>
            <img 
              alt="Owlstin" 
              className="w-full h-full relative z-10 animate-glow drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" 
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
              }} 
              src="/lovable-uploads/1407c5df-d2eb-4632-9fe0-79f2fd9d015f.png" 
            />
            
            {/* Add circling magical particles */}
            {Array.from({length: 6}).map((_, i) => (
              <div 
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-wizardry-gold"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateY(-60px)`,
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
                  animation: `spin-slow 10s linear infinite${i % 2 === 0 ? ' reverse' : ''}`
                }}
              ></div>
            ))}
          </div>
          
          {/* Hero Title with improved magical styling */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-wizardry-crimson via-wizardry-gold/40 to-wizardry-crimson opacity-30"></div>
            <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-wizardry-gold via-wizardry-gold/90 to-wizardry-gold/80 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)] relative z-10">
              Unlock Your Career Magic
            </h1>
          </div>
          
          {/* Subtitle with improved styling */}
          <p className="text-wizardry-parchment text-lg md:text-xl max-w-2xl mx-auto mb-12 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
            <span className="text-wizardry-gold font-medium">Owlstin</span> harnesses the power of AI to match your skills with job requirements, revealing your path to professional enchantment.
          </p>
          
          {/* CTA Buttons with improved styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/job-seeker">
              <Button size="lg" className="magical-button group text-lg px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Reveal My Match</span>
              </Button>
            </Link>
            <Link to="/recruiter">
              <Button variant="outline" size="lg" className="border-wizardry-gold/50 hover:border-wizardry-gold/80 text-wizardry-parchment hover:bg-wizardry-crimson/20 text-lg px-8 py-6 rounded-lg backdrop-blur-sm">
                For Recruiters
              </Button>
            </Link>
          </div>
          
          {/* Magical orbs with improved styling */}
          <div className="absolute top-1/4 -left-20 w-16 h-16 magical-orb hidden lg:block"></div>
          <div className="absolute bottom-1/3 -right-10 w-12 h-12 magical-orb hidden lg:block" style={{
            animationDelay: "-2s"
          }}></div>
          
          {/* Add small floating magical symbols */}
          <div className="absolute bottom-1/4 left-1/4 w-10 h-10 opacity-70">
            <div className="w-full h-full border border-wizardry-gold/40 rounded-full animate-spin-slow"></div>
          </div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 opacity-70">
            <div className="w-full h-full border border-wizardry-gold/40 rotate-45 animate-float" style={{animationDelay: "-3s"}}></div>
          </div>
        </div>
        
        {/* Scroll Down Indicator with improved styling */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToFeatures} 
            aria-label="Scroll down"
            className="w-10 h-10 rounded-full border border-wizardry-gold/50 flex items-center justify-center backdrop-blur-sm group hover:bg-wizardry-crimson/20 transition-colors"
          >
            <ArrowDown className="text-wizardry-gold w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
