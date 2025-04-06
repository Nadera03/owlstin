
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-magical-midnight text-magical-starlight">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-cinzel font-bold mb-4 bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">404</h1>
        <p className="text-2xl text-magical-starlight/80 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-magical-starlight/60 mb-8">
          The path <span className="font-mono bg-magical-midnight-darker rounded px-2 py-1">{location.pathname}</span> could not be found.
        </p>
        
        <div className="space-y-4">
          <Link to="/" className="magical-button w-full block py-2 px-4 rounded-md text-center">
            Return to Home
          </Link>
          
          <div className="mt-8 border-t border-magical-glowing-teal/20 pt-6">
            <h2 className="text-xl mb-4 text-magical-glowing-teal">Popular Pages</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/about" className="text-magical-starlight/80 hover:text-magical-glowing-teal">About</Link>
              <Link to="/pricing" className="text-magical-starlight/80 hover:text-magical-glowing-teal">Pricing</Link>
              <Link to="/job-seeker" className="text-magical-starlight/80 hover:text-magical-glowing-teal">Job Seekers</Link>
              <Link to="/recruiter" className="text-magical-starlight/80 hover:text-magical-glowing-teal">Recruiters</Link>
              <Link to="/faq" className="text-magical-starlight/80 hover:text-magical-glowing-teal">FAQ</Link>
              <Link to="/support" className="text-magical-starlight/80 hover:text-magical-glowing-teal">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
