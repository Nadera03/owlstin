
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { JungleButton } from "@/components/ui/jungle-button";
import { useBiome } from "@/contexts/BiomeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentBiome } = useBiome();

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-archive-base/70 backdrop-blur-md py-3 shadow-lg border-b border-archive-border" : "bg-transparent py-5"}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 sparkle-light"></div>
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
          <span className={`font-headline text-2xl font-bold ${getBiomeTextClass(currentBiome)}`}>
            Owlstin
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" currentPath={location.pathname} biome={currentBiome}>Home</NavLink>
          <NavLink to="/about" currentPath={location.pathname} biome={currentBiome}>About</NavLink>
          <NavLink to="/pricing" currentPath={location.pathname} biome={currentBiome}>Pricing</NavLink>
          <NavLink to="/testimonials" currentPath={location.pathname} biome={currentBiome}>Testimonials</NavLink>
          <NavLink to="/faq" currentPath={location.pathname} biome={currentBiome}>FAQ</NavLink>
        </nav>
        
        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className={`border-${getBiomeClass(currentBiome)}/50 hover:border-${getBiomeClass(currentBiome)} hover:bg-archive-secondary/30 text-archive-text`}>
              Login
            </Button>
          </Link>
          <Link to="/job-seeker">
            <JungleButton biomeType={currentBiome}>
              Get Started
            </JungleButton>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-archive-text" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-archive-base/90 backdrop-blur-md z-40 flex flex-col">
          <nav className="container px-4 py-8 flex flex-col gap-6">
            <MobileNavLink to="/" biome={currentBiome} onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" biome={currentBiome} onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/pricing" biome={currentBiome} onClick={() => setIsMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink to="/testimonials" biome={currentBiome} onClick={() => setIsMenuOpen(false)}>Testimonials</MobileNavLink>
            <MobileNavLink to="/faq" biome={currentBiome} onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>
            
            <div className="flex flex-col gap-4 mt-6">
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className={`border-${getBiomeClass(currentBiome)}/50 w-full text-archive-text`}>
                  Login
                </Button>
              </Link>
              <Link to="/job-seeker" onClick={() => setIsMenuOpen(false)}>
                <JungleButton biomeType={currentBiome} className="w-full">
                  Get Started
                </JungleButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function getBiomeClass(biome: string): string {
  switch (biome) {
    case 'tropical': return 'biome-tropical';
    case 'savanna': return 'biome-savanna';
    case 'tundra': return 'biome-tundra';
    case 'desert': return 'biome-desert';
    case 'forest': return 'biome-forest';
    default: return 'archive-accent';
  }
}

function getBiomeTextClass(biome: string): string {
  switch (biome) {
    case 'tropical': return 'text-biome-tropical';
    case 'savanna': return 'text-biome-savanna';
    case 'tundra': return 'text-biome-tundra';
    case 'desert': return 'text-biome-desert';
    case 'forest': return 'text-biome-forest';
    default: return 'text-archive-accent';
  }
}

const NavLink = ({
  to,
  children,
  currentPath,
  biome
}: {
  to: string;
  children: React.ReactNode;
  currentPath: string;
  biome: string;
}) => {
  const isActive = currentPath === to;
  const biomeColorClass = getBiomeTextClass(biome);
  
  return (
    <Link 
      to={to} 
      className={`text-archive-text/80 hover:${biomeColorClass} transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:${biomeColorClass.replace('text', 'bg')} ${isActive ? biomeColorClass + ' after:scale-x-100' : 'after:scale-x-0'} after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  children,
  onClick,
  biome
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  biome: string;
}) => {
  const biomeColorClass = getBiomeTextClass(biome);
  
  return (
    <Link 
      to={to} 
      className={`text-archive-text text-2xl font-headline hover:${biomeColorClass} transition-colors duration-300`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
