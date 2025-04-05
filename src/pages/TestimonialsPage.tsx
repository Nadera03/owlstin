
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Star } from "lucide-react";

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
    <div className="min-h-screen bg-archive-base text-archive-text relative overflow-hidden">
      <div className="archive-noise"></div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="barcode mb-4 inline-block">ARCHIVE_TESTIMONY_00456</div>
          <h1 className="text-5xl md:text-7xl font-headline uppercase tracking-wider mb-6">
            <span className="text-archive-accent">OWLSTIN</span> RESULTS
          </h1>
          <div className="h-1 w-24 bg-archive-accent mx-auto mb-6"></div>
          <p className="text-archive-muted text-lg mt-4">
            Verified outcomes from distinguished professionals who leveraged Owlstin's strategic guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="archive-card p-6 rounded-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-archive-accent text-archive-base text-xs font-mono py-1 px-2">
                #{(index + 1).toString().padStart(3, '0')}
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 object-cover mr-4 border border-archive-border duotone"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkY0RDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz48L3N2Zz4=";
                  }}
                />
                <div>
                  <h3 className="font-display text-lg uppercase">{testimonial.name}</h3>
                  <p className="text-xs text-archive-muted">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-archive-accent text-archive-accent" />
                ))}
                {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                  <Star key={i + testimonial.stars} className="h-4 w-4 text-archive-muted" />
                ))}
              </div>
              
              <p className="text-archive-text/90 text-sm relative z-10 border-l-2 border-archive-accent pl-3">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
