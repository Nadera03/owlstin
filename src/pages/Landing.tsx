import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import Hero from "@/components/landing/Hero";
import TestimonialCarousel from "@/components/landing/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Map, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Landing() {
  // Set dark mode and scroll to top on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  return <div className="min-h-screen bg-magical-midnight text-magical-starlight overflow-hidden">
      <Starfield />
      <MagicCursor />
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section id="features-section" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-4 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent">Build. Apply. Win. — With AI by Your Side.</h2>
          <p className="text-magical-starlight/70 text-center max-w-2xl mx-auto mb-16">Owlstin is your intelligent career assistant, designed for both students and recruiters.
Students get resume upgrades, job-fit scoring, direct applications &amp; personalized learning.
Recruiters get ranked talent, JD analysis, and deep-fit reasoning — all in one click.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="magical-card p-6 transform transition-transform hover:scale-105 hover:shadow-magical-glow">
              <div className="w-12 h-12 bg-magical-glowing-teal/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-magical-glowing-teal" />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-2 text-magical-starlight">Skill Analysis</h3>
              <p className="text-magical-starlight/70">
                Our magical AI analyzes your resume and identifies key skills that align with your dream job.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="magical-card p-6 transform transition-transform hover:scale-105 hover:shadow-magical-glow">
              <div className="w-12 h-12 bg-magical-glowing-teal/20 rounded-lg flex items-center justify-center mb-4">
                <Map className="text-magical-glowing-teal" />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-2 text-magical-starlight">Learning Roadmap</h3>
              <p className="text-magical-starlight/70">
                Get a personalized magical roadmap to acquire missing skills with curated resources and project ideas.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="magical-card p-6 transform transition-transform hover:scale-105 hover:shadow-magical-glow">
              <div className="w-12 h-12 bg-magical-glowing-teal/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-magical-glowing-teal" />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-2 text-magical-starlight">Recruiter Magic</h3>
              <p className="text-magical-starlight/70">
                Recruiters can find the perfect candidates with our magical matching algorithms and talent insights.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="magical-card p-6 transform transition-transform hover:scale-105 hover:shadow-magical-glow">
              <div className="w-12 h-12 bg-magical-glowing-teal/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-magical-glowing-teal" />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-2 text-magical-starlight">Progress Tracking</h3>
              <p className="text-magical-starlight/70">
                Track your learning journey and see your match percentage increase as you master new skills.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="magical-card p-6 transform transition-transform hover:scale-105 hover:shadow-magical-glow">
              <div className="w-12 h-12 bg-magical-glowing-teal/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-magical-glowing-teal" />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-2 text-magical-starlight">Skill Badges</h3>
              <p className="text-magical-starlight/70">
                Earn magical badges as you complete skill milestones and showcase your achievements.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="magical-card p-6 transform transition-transform hover:scale-105 hover:shadow-magical-glow">
              <div className="w-12 h-12 bg-magical-glowing-teal/20 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-magical-glowing-teal" />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-2 text-magical-starlight">AI Recommendations</h3>
              <p className="text-magical-starlight/70">
                Receive enchanted advice from our AI to help you stand out in the competitive job market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="magical-card p-8 md:p-12 relative overflow-hidden">
            {/* Magic glowing orb background */}
            <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-magical-glowing-teal/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-1/3 -left-1/3 w-1/2 h-1/2 bg-magical-purple-light/10 rounded-full filter blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 bg-gradient-to-r from-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent">Trusted by campuses. Loved by recruiters. Powered by Gen AI.</h2>
                <p className="text-magical-starlight/80 mb-6">Join thousands of professionals who have transformed their careers with Owlstin's magical guidance.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/job-seeker">
                    <Button className="magical-button" size="lg">
                      <span>For Job Seekers</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/recruiter">
                    <Button variant="outline" className="border-magical-glowing-teal/50 hover:border-magical-glowing-teal/80 text-magical-starlight hover:bg-magical-glowing-teal/5" size="lg">
                      <span>For Recruiters</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Floating Orb */}
              <div className="w-40 h-40 md:w-60 md:h-60 floating-orb flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-magical-midnight flex items-center justify-center animate-spin-slow">
                  <img alt="Owlstin" className="w-2/3 h-2/3" onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDREREREIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
                }} src="/lovable-uploads/be9e8787-b6e2-4fb7-a273-df4945a558c0.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialCarousel />
      
      {/* Footer */}
      <footer className="bg-magical-midnight border-t border-magical-glowing-teal/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative">
                  
                </div>
                <span className="font-cinzel text-xl font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                  Owlstin
                </span>
              </Link>
              <p className="text-magical-starlight/60 text-sm mb-4 font-extrabold">Owlstin is a student-built AI platform that bridges the gap between fresh talent and modern recruiters. With explainable AI, live resume updates, and hiring intelligence, we aim to redefine early-career hiring.
            </p>
            </div>
            
            <div>
              <h5 className="font-cinzel font-bold text-magical-starlight mb-4">Services</h5>
              <ul className="space-y-2">
                <li><Link to="/job-seeker" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">For Job Seekers</Link></li>
                <li><Link to="/recruiter" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">For Recruiters</Link></li>
                <li><Link to="/pricing" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">Pricing</Link></li>
                <li><Link to="/testimonials" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-cinzel font-bold text-magical-starlight mb-4">Company</h5>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">FAQ</Link></li>
                <li><Link to="/privacy" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-cinzel font-bold text-magical-starlight mb-4">Contact</h5>
              <ul className="space-y-2">
                <li><a href="mailto:hello@owlstin.io" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">hello@owlstin.io</a></li>
                <li><Link to="/support" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">Support</Link></li>
                
              </ul>
            </div>
          </div>
          
          <div className="border-t border-magical-glowing-teal/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-magical-starlight/60 text-sm">
              © {new Date().getFullYear()} Owlstin. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link to="#" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-magical-starlight/60 hover:text-magical-glowing-teal transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}