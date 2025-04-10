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
  const testimonials = [{
    name: "Sarah Johnson",
    position: "Software Developer",
    company: "Tech Innovations Inc.",
    image: "https://i.pravatar.cc/150?img=32",
    stars: 5,
    text: "Owlstin completely transformed my job search. I was struggling to get interviews for senior developer positions despite having years of experience. The skill gap analysis pinpointed exactly what I was missing, and after following the learning path for just 2 months, I landed my dream job!"
  }, {
    name: "Michael Rodriguez",
    position: "Data Scientist",
    company: "DataMind Analytics",
    image: "https://i.pravatar.cc/150?img=11",
    stars: 5,
    text: "As someone transitioning from academia to industry, I had no idea what skills employers were actually looking for. Owlstin broke it down for me and created a personalized learning roadmap. The skill visualizations were particularly helpful in tracking my progress."
  }, {
    name: "Jennifer Wu",
    position: "UX Designer",
    company: "Creative Solutions",
    image: "https://i.pravatar.cc/150?img=5",
    stars: 4,
    text: "The skill gap analysis was eye-opening. I discovered that while my design skills were strong, I was missing key collaboration tools that employers in my field valued. Thanks to Owlstin, I was able to focus my learning effectively."
  }, {
    name: "David Okafor",
    position: "Product Manager",
    company: "InnovateCorp",
    image: "https://i.pravatar.cc/150?img=15",
    stars: 5,
    text: "I've tried numerous career development tools, but none come close to Owlstin's magical approach. The AI recommendations were surprisingly accurate, and the resource suggestions were top-notch. I've recommended it to my entire professional network!"
  }, {
    name: "Emma Lawson",
    position: "HR Director",
    company: "Global Enterprises",
    image: "https://i.pravatar.cc/150?img=23",
    stars: 5,
    text: "From a recruiter's perspective, Owlstin has been a game-changer. We can now quickly identify the best candidates for positions based on actual skill alignment rather than keyword matching. Our hiring efficiency has improved by 40%!"
  }, {
    name: "Rajiv Patel",
    position: "Full Stack Developer",
    company: "Web Solutions Plus",
    image: "https://i.pravatar.cc/150?img=70",
    stars: 4,
    text: "The platform identified gaps in my backend skills that I wasn't aware of. The suggested projects were practical and helped me build a portfolio that showcased my new abilities. Within weeks of completing the recommendations, I received three job offers!"
  }];
  return <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6">
            Success Stories
          </h1>
          <p className="text-magical-starlight/70 text-lg">Hear from professionals who transformed their careers with Owlstin's guidance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="magical-card p-6 rounded-xl overflow-hidden relative">
              <Quote className="absolute top-4 right-4 text-magical-glowing-teal/20 h-12 w-12" />
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-magical-glowing-teal/30" onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDREREREIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz48L3N2Zz4=";
            }} />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-magical-starlight/70">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({
              length: testimonial.stars
            }).map((_, i) => <Star key={i} className="h-4 w-4 fill-magical-glowing-teal text-magical-glowing-teal" />)}
                {Array.from({
              length: 5 - testimonial.stars
            }).map((_, i) => <Star key={i + testimonial.stars} className="h-4 w-4 text-magical-starlight/30" />)}
              </div>
              
              <p className="text-magical-starlight/90 italic relative z-10">
                "{testimonial.text}"
              </p>
            </div>)}
        </div>
      </div>
    </div>;
}