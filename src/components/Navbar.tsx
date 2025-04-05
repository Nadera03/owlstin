
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { MysticalButton } from "@/components/ui/mystical-button";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-wizardry-midnight/70 backdrop-blur-md py-3 shadow-lg border-b border-wizardry-primary/20" : "bg-transparent py-5"}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(155,135,245,0.3)_0%,_transparent_70%)] animate-pulse"></div>
            <img 
              alt="Owlstin" 
              className="w-full h-full relative z-10" 
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtb3dsIj48cGF0aCBkPSJNNCA5DjwvcGF0aD48cGF0aCBkPSJNOCAxMTQ0Ijy8L3BhdGg+PHBhdGggZD0iTTE0IDExNiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+PHBhdGggZD0iTTggNGM0LTMgOC0zIDEyIDAibXA9InRyYW5zZm9ybSI+PC9wYXRoPjwvc3ZnPg==";
              }} 
              src="/lovable-uploads/088dd482-9cad-422a-9d2c-6d3132c3dfe4.png" 
            />
          </div>
          <span className="font-headline text-2xl font-bold text-wizardry-primary">
            Owlstin
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
          <NavLink to="/pricing" currentPath={location.pathname}>Pricing</NavLink>
          <NavLink to="/testimonials" currentPath={location.pathname}>Testimonials</NavLink>
          <NavLink to="/faq" currentPath={location.pathname}>FAQ</NavLink>
        </nav>
        
        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className="border-wizardry-primary/50 hover:border-wizardry-primary hover:bg-wizardry-primary/10 text-wizardry-parchment">
              Login
            </Button>
          </Link>
          <Link to="/job-seeker">
            <MysticalButton>
              Get Started
            </MysticalButton>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-wizardry-parchment" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-wizardry-midnight/90 backdrop-blur-md z-40 flex flex-col">
          <nav className="container px-4 py-8 flex flex-col gap-6">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink to="/testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</MobileNavLink>
            <MobileNavLink to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>
            
            <div className="flex flex-col gap-4 mt-6">
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="border-wizardry-primary/50 w-full text-wizardry-parchment">
                  Login
                </Button>
              </Link>
              <Link to="/job-seeker" onClick={() => setIsMenuOpen(false)}>
                <MysticalButton className="w-full">
                  Get Started
                </MysticalButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

const NavLink = ({
  to,
  children,
  currentPath
}: {
  to: string;
  children: React.ReactNode;
  currentPath: string;
}) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={`text-wizardry-parchment/80 hover:text-wizardry-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-wizardry-primary ${isActive ? 'text-wizardry-primary after:scale-x-100' : 'after:scale-x-0'} after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  children,
  onClick
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link 
      to={to} 
      className="text-wizardry-parchment text-2xl font-headline hover:text-wizardry-primary transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
