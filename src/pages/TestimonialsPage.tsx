
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import { Star, Quote } from "lucide-react";

export default function TestimonialsPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Software Development Lead",
      company: "Tech Innovations Inc.",
      image: "https://i.pravatar.cc/150?img=32",
      stars: 5,
      text: "Owlstin's sophisticated analysis transformed my professional trajectory. Despite extensive experience, I struggled to secure senior development positions. Their precise competency assessment identified critical skill gaps, and following their tailored development path for just 8 weeks led to multiple offers at tier-one organizations.",
    },
    {
      name: "Michael Rodriguez",
      position: "Principal Data Scientist",
      company: "DataMind Analytics",
      image: "https://i.pravatar.cc/150?img=11",
      stars: 5,
      text: "Transitioning from academia to industry presented significant challenges in understanding market requirements. Owlstin provided exceptional clarity through their detailed skills analysis and customized development framework. Their visual competency progression mapping proved invaluable for tracking my professional evolution.",
    },
    {
      name: "Jennifer Wu",
      position: "Senior UX Strategist",
      company: "Creative Solutions",
      image: "https://i.pravatar.cc/150?img=5",
      stars: 4,
      text: "The comprehensive analysis illuminated unexpected insights into my professional profile. While my design competencies were substantial, Owlstin identified critical gaps in collaboration tools and methodologies valued by premier employers. This focused perspective allowed for highly targeted skill development.",
    },
    {
      name: "David Okafor",
      position: "Director of Product Strategy",
      company: "InnovateCorp",
      image: "https://i.pravatar.cc/150?img=15",
      stars: 5,
      text: "After evaluating numerous professional development platforms, Owlstin stands unparalleled in its analytical depth and strategic insight. The AI-driven recommendations demonstrated remarkable precision, and the curated resource selection exceeded all expectations. I've advocated for its implementation across our entire executive team.",
    },
    {
      name: "Emma Lawson",
      position: "Chief Human Resources Officer",
      company: "Global Enterprises",
      image: "https://i.pravatar.cc/150?img=23",
      stars: 5,
      text: "From a talent acquisition perspective, Owlstin has revolutionized our recruitment methodology. We can now efficiently identify optimal candidates based on substantive competency alignment rather than superficial keyword matching. Our hiring effectiveness metrics have improved by 40% since implementation.",
    },
    {
      name: "Rajiv Patel",
      position: "Full Stack Development Architect",
      company: "Web Solutions Plus",
      image: "https://i.pravatar.cc/150?img=70",
      stars: 4,
      text: "The platform identified critical gaps in my backend architecture expertise that remained undetected through conventional assessment. The recommended project portfolio was exceptionally well-calibrated and enabled me to demonstrate my newly acquired capabilities. Within weeks of completing the prescribed development path, I received multiple competitive offers.",
    },
  ];

  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6">
            Professional Transformation Stories
          </h1>
          <p className="text-magical-starlight/70 text-lg">
            Discover how distinguished professionals have elevated their careers through Owlstin's strategic guidance and analytical insight.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="magical-card p-6 rounded-xl overflow-hidden relative">
              <Quote className="absolute top-4 right-4 text-magical-glowing-teal/20 h-12 w-12" />
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-magical-glowing-teal/30"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDREREREIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz48L3N2Zz4=";
                  }}
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-magical-starlight/70">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-magical-glowing-teal text-magical-glowing-teal" />
                ))}
                {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                  <Star key={i + testimonial.stars} className="h-4 w-4 text-magical-starlight/30" />
                ))}
              </div>
              
              <p className="text-magical-starlight/90 italic relative z-10">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
