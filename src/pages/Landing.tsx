
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import MagicCursor from "@/components/MagicCursor";
import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { MysticalButton } from "@/components/ui/mystical-button";
import { ArrowRight, BookOpen, Users, Award, Map, Calendar, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

export default function Landing() {
  const { setCurrentTheme } = useTheme();

  // Set dark mode and scroll to top on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    setCurrentTheme('default');
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [setCurrentTheme]);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 bg-wizardry-midnight bg-noise pointer-events-none"></div>
      <MagicCursor />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            {/* Hero Title */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-wizardry-primary via-wizardry-gold/40 to-wizardry-primary opacity-30"></div>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-wizardry-primary via-wizardry-primary/90 to-wizardry-primary/80 drop-shadow-[0_0_5px_rgba(155,135,245,0.5)] relative z-10">
                Discover Your Career Path
              </h1>
            </div>
            <p className="text-wizardry-parchment/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 backdrop-blur-sm bg-wizardry-dark/30 p-4 rounded-md">
              Navigate your professional journey with our AI-powered career guidance platform, designed to help you thrive in any environment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/job-seeker">
                <MysticalButton size="lg">
                  Start Your Journey
                  <ArrowRight className="ml-2" />
                </MysticalButton>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-wizardry-primary/50 hover:border-wizardry-primary hover:bg-wizardry-dark/30">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Visual Elements */}
          <div className="relative mx-auto max-w-2xl h-80 mt-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-wizardry-dark/40 backdrop-blur-md rounded-xl border border-wizardry-primary/30 overflow-hidden magical-window">
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(155,135,245,0.5)_0%,_transparent_70%)]"></div>
                  
                  {/* Floating Purple Orbs */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-4 h-4 rounded-full bg-wizardry-primary animate-float" 
                      style={{ 
                        left: `${10 + i * 20}%`,
                        top: `${20 + (i * 10) % 40}%`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.7,
                        boxShadow: '0 0 20px 5px rgba(155, 135, 245, 0.3)'
                      }}
                    />
                  ))}
                  
                  {/* Journey Path Visualization */}
                  <div className="absolute bottom-8 left-8 right-8 h-1 bg-wizardry-primary/50 rounded-full">
                    <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-wizardry-primary animate-pulse"></div>
                    <div className="absolute -top-3 left-1/4 -translate-x-1/2 w-7 h-7 rounded-full bg-wizardry-primary/70 border border-white/20 animate-float"></div>
                    <div className="absolute -top-4 left-2/3 -translate-x-1/2 w-9 h-9 rounded-full bg-wizardry-primary/80 border-2 border-white/30 animate-float" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute -top-2 right-0 translate-x-1/2 w-5 h-5 rounded-full bg-wizardry-primary/90 animate-pulse"></div>
                  </div>
                  
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h3 className="text-wizardry-primary text-2xl font-headline mb-2">Your Career Expedition</h3>
                    <p className="text-wizardry-parchment/80">Discover new skills and opportunities in our mystical digital realm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Magical particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({length: 20}).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 rounded-full bg-wizardry-primary/70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px 2px rgba(155, 135, 245, 0.5)',
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features-section" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-headline text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-wizardry-primary to-wizardry-light">
            Navigate Your Professional Journey
          </h2>
          <p className="text-wizardry-parchment/90 text-center max-w-2xl mx-auto mb-16 backdrop-blur-sm bg-wizardry-dark/30 p-4 rounded-md">
            Our proprietary AI system meticulously analyzes your professional profile against industry demands, revealing optimal career paths tailored to your unique constellation of skills and aspirations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-wizardry-dark/40 backdrop-blur-md rounded-xl border border-wizardry-primary/30 p-6 transform transition-transform hover:scale-105 magical-window">
              <div className="w-12 h-12 bg-wizardry-primary/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-wizardry-primary" />
              </div>
              <h3 className="text-xl font-headline mb-2 text-wizardry-primary">Comprehensive Analysis</h3>
              <p className="text-wizardry-parchment/80">
                Our advanced algorithm conducts a multi-dimensional assessment of your professional profile, identifying core competencies and hidden strengths that align with your career aspirations.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-wizardry-dark/40 backdrop-blur-md rounded-xl border border-wizardry-primary/30 p-6 transform transition-transform hover:scale-105 magical-window">
              <div className="w-12 h-12 bg-wizardry-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Map className="text-wizardry-primary" />
              </div>
              <h3 className="text-xl font-headline mb-2 text-wizardry-primary">Strategic Development</h3>
              <p className="text-wizardry-parchment/80">
                Receive a bespoke professional development framework with curated learning resources, skill-building opportunities, and targeted projects designed to elevate your market position.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-wizardry-dark/40 backdrop-blur-md rounded-xl border border-wizardry-primary/30 p-6 transform transition-transform hover:scale-105 magical-window">
              <div className="w-12 h-12 bg-wizardry-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-wizardry-primary" />
              </div>
              <h3 className="text-xl font-headline mb-2 text-wizardry-primary">Optimal Placement</h3>
              <p className="text-wizardry-parchment/80">
                Our sophisticated matching algorithm identifies your ideal professional opportunities and provides comprehensive preparation for successful interviews and negotiations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-wizardry-dark/40 backdrop-blur-md rounded-xl border border-wizardry-primary/30 p-8 md:p-12 relative overflow-hidden magical-window">
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-headline mb-4 text-transparent bg-clip-text bg-gradient-to-r from-wizardry-primary to-wizardry-light">
                  Start Your Professional Expedition
                </h2>
                <p className="text-wizardry-parchment/80 mb-6">
                  Join a distinguished community of professionals who have elevated their careers through Owlstin's sophisticated guidance and strategic insight.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/job-seeker">
                    <MysticalButton size="lg">
                      <span>For Job Seekers</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </MysticalButton>
                  </Link>
                  <Link to="/recruiter">
                    <Button variant="outline" className="border-wizardry-primary/50 hover:border-wizardry-primary hover:bg-wizardry-dark/30" size="lg">
                      <span>For Recruiters</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="w-40 h-40 md:w-60 md:h-60 relative">
                <div className="absolute inset-0 bg-wizardry-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-wizardry-primary to-wizardry-deep-purple border border-wizardry-light/30 animate-float flex items-center justify-center">
                    <img 
                      alt="Owlstin" 
                      className="w-2/3 h-2/3" 
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
                      }} 
                      src="/lovable-uploads/bbd45bae-a179-407f-98dd-47260870a75f.png" 
                    />
                  </div>
                </div>
                {/* Add floating particles */}
                {Array.from({length: 3}).map((_, i) => (
                  <div 
                    key={`particle-${i}`} 
                    className="absolute w-3 h-3 rounded-full bg-wizardry-primary/70"
                    style={{
                      top: `${25 + (i * 20)}%`,
                      left: i % 2 === 0 ? '-10%' : '110%',
                      boxShadow: '0 0 15px 5px rgba(155, 135, 245, 0.4)',
                      animation: `float ${4 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.7}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-wizardry-dark/70 backdrop-blur-md border-t border-wizardry-primary/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative">
                  <img alt="Owlstin" className="w-full h-full" onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
                }} src="/lovable-uploads/d3761d88-e647-4000-acfc-f5a546ace41e.png" />
                </div>
                <span className="font-headline text-xl font-bold text-wizardry-primary">
                  Owlstin
                </span>
              </Link>
              <p className="text-wizardry-parchment/60 text-sm mb-4">
                Unlocking career potential with magical AI-powered guidance.
              </p>
              
              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="font-headline font-bold text-wizardry-primary mb-3">Join our circle</h5>
                <div className="flex gap-2">
                  <input type="email" placeholder="Enter your email" className="magical-input flex-1" />
                  <Button variant="outline" className="border-wizardry-primary/50 hover:border-wizardry-primary text-wizardry-parchment hover:bg-wizardry-primary/10">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-headline font-bold text-wizardry-primary mb-4">Services</h5>
              <ul className="space-y-2">
                <li><Link to="/job-seeker" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">For Job Seekers</Link></li>
                <li><Link to="/recruiter" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">For Recruiters</Link></li>
                <li><Link to="/pricing" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">Pricing</Link></li>
                <li><Link to="/testimonials" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-headline font-bold text-wizardry-primary mb-4">Company</h5>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">FAQ</Link></li>
                <li><Link to="/privacy" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-headline font-bold text-wizardry-primary mb-4">Contact</h5>
              <ul className="space-y-2">
                <li><a href="mailto:hello@owlstin.io" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">hello@owlstin.io</a></li>
                <li><Link to="/support" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">Support</Link></li>
                <li><Link to="/blog" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-wizardry-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-wizardry-parchment/60 text-sm">
              © {new Date().getFullYear()} Owlstin. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link to="#" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-wizardry-parchment/60 hover:text-wizardry-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Update FAQ items with more professional descriptions
const faqItems = [
  {
    question: "How does Owlstin's algorithm match candidates with positions?",
    answer: "Our proprietary multi-dimensional analysis engine evaluates your professional profile against comprehensive industry data, identifying optimal alignments between your skill portfolio and position requirements. The system employs advanced pattern recognition to reveal career trajectories that maximize your potential."
  },
  {
    question: "What distinguishes Owlstin from conventional career platforms?",
    answer: "Unlike traditional job boards, Owlstin employs sophisticated skills gap analysis and provides targeted development pathways to strategically position you for aspirational roles, rather than limiting recommendations to positions matching your current qualifications."
  },
  {
    question: "How frequently is the position database updated?",
    answer: "Our extensive position database undergoes continuous refinement through our extensive employer partnerships and advanced data acquisition systems, ensuring you receive the most current and relevant opportunities in your field."
  },
  {
    question: "Can Owlstin assist professionals with undefined career objectives?",
    answer: "Absolutely. Our career discovery protocol employs psychometric assessment and skills analysis to identify latent professional strengths and align them with fulfilling career trajectories that might otherwise remain undiscovered."
  },
  {
    question: "How is candidate privacy managed within the Owlstin ecosystem?",
    answer: "Your professional profile remains securely protected within our system until you explicitly authorize visibility to specific organizations or apply for positions. You maintain complete sovereignty over your professional information throughout the process."
  }
];
