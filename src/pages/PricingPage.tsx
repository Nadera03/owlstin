
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const tiers = [
    {
      name: "Explorer",
      price: "$0",
      description: "Perfect for individuals just starting their career journey",
      features: [
        "5 Resume Analyses per Month",
        "Basic Skill Gap Analysis",
        "Limited Learning Resources",
        "Email Support",
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      icon: <Sparkles className="h-5 w-5 text-magical-glowing-teal" />,
    },
    {
      name: "Professional",
      price: "$19",
      description: "Comprehensive tools for serious job seekers",
      features: [
        "Unlimited Resume Analyses",
        "Advanced Skill Gap Analysis",
        "Personalized Learning Paths",
        "Interview Preparation Tools",
        "Priority Email Support",
        "Career Path Visualization",
      ],
      buttonText: "Get Started",
      buttonVariant: "magical",
      icon: <Zap className="h-5 w-5 text-magical-glowing-teal" />,
      mostPopular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For recruiters and hiring teams",
      features: [
        "Unlimited Candidate Analyses",
        "Team Collaboration Tools",
        "Advanced Analytics Dashboard",
        "Custom API Integration",
        "Dedicated Account Manager",
        "Talent Pool Insights",
        "24/7 Premium Support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      icon: <Shield className="h-5 w-5 text-magical-glowing-teal" />,
    },
  ];

  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6">
            Pricing Plans for Every Journey
          </h1>
          <p className="text-magical-starlight/70 text-lg max-w-prose mx-auto">
            Choose the perfect plan to unlock your career potential with our magical AI-powered guidance.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-x-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`relative magical-card p-8 rounded-xl flex flex-col ${tier.mostPopular ? "border-magical-glowing-teal border-2" : ""}`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                  <div className="bg-magical-glowing-teal text-magical-midnight px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-4">
                {tier.icon}
                <h3 className="text-xl font-cinzel font-bold">{tier.name}</h3>
              </div>
              
              <div className="my-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-magical-starlight/70 ml-2">/ month</span>
              </div>
              
              <p className="text-magical-starlight/70 mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-magical-glowing-teal flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/job-seeker" className="mt-auto">
                <Button 
                  className={`w-full ${tier.buttonVariant === "magical" ? "magical-button" : "border-magical-glowing-teal/50 hover:border-magical-glowing-teal/80 hover:bg-magical-glowing-teal/5"}`}
                  variant={tier.buttonVariant === "magical" ? "default" : "outline"}
                >
                  {tier.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mx-auto max-w-3xl mt-20 magical-card p-8 rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
              Frequently Asked Questions about Pricing
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Can I change plans later?</h3>
              <p className="text-magical-starlight/70">
                Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Is there a free trial?</h3>
              <p className="text-magical-starlight/70">
                Our Explorer plan is always free. We also offer a 14-day trial for our Professional plan so you can experience all the features before committing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-magical-starlight/70">
                We accept all major credit cards, PayPal, and for Enterprise plans, we can also arrange invoicing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
