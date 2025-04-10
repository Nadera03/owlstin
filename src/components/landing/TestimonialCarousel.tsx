import { useState, useEffect, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}
const testimonials: Testimonial[] = [{
  id: 1,
  name: "Emma Watson",
  role: "Software Developer",
  company: "Spellbound Tech",
  text: "Owlstin helped me identify key skills I was missing and provided a magical roadmap to land my dream job. The AI recommendations were spot-on!",
  rating: 5,
  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
}, {
  id: 2,
  name: "Daniel Radcliffe",
  role: "UX Designer",
  company: "Wizardry Interfaces",
  text: "The skill gap analysis was incredibly accurate. I followed the learning path and secured 3 job interviews within a month. Simply magical!",
  rating: 5,
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
}, {
  id: 3,
  name: "Hermione Granger",
  role: "Product Manager",
  company: "Enchanted Products Inc.",
  text: "As someone switching careers, Owlstin made the transition seamless. The AI understood exactly what skills I needed to develop.",
  rating: 4,
  avatar: "https://randomuser.me/api/portraits/women/66.jpg"
}, {
  id: 4,
  name: "Ron Weasley",
  role: "Data Analyst",
  company: "Crystal Ball Analytics",
  text: "The personalized learning resources were incredibly helpful. I went from rejection letters to multiple offers in just 8 weeks.",
  rating: 5,
  avatar: "https://randomuser.me/api/portraits/men/11.jpg"
}, {
  id: 5,
  name: "Luna Lovegood",
  role: "AI Researcher",
  company: "Magical Algorithms Ltd",
  text: "Owlstin's recommendations were like having a career mentor who truly understood my strengths and aspirations. Truly enchanting!",
  rating: 5,
  avatar: "https://randomuser.me/api/portraits/women/76.jpg"
}];
export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const handleSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);
  return <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-16 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Voices of Our Users!</h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
            <button onClick={scrollPrev} className="magical-button p-2 rounded-full" aria-label="Previous testimonial">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
            <button onClick={scrollNext} className="magical-button p-2 rounded-full" aria-label="Next testimonial">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Carousel */}
          <Carousel setApi={setApi} opts={{
          loop: true,
          align: "start"
        }}>
            <CarouselContent>
              {testimonials.map(testimonial => <CarouselItem key={testimonial.id} className={`${isMobile ? "basis-full" : "basis-1/3"} pl-4 md:pl-6`}>
                  <Card className="magical-card border-magical-glowing-teal/20 h-full bg-magical-midnight">
                    <CardContent className="p-6">
                      {/* Stars */}
                      <div className="flex mb-4">
                        {Array.from({
                      length: 5
                    }).map((_, i) => <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? "text-magical-glowing-teal fill-magical-glowing-teal" : "text-gray-400"}`} />)}
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-magical-starlight/90 mb-6 h-32 overflow-hidden">"{testimonial.text}"</p>
                      
                      {/* Author */}
                      <div className="flex items-center">
                        <div className="mr-4 relative">
                          <div className="badge-glow">
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-magical-glowing-teal/30" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-magical-starlight font-bold">{testimonial.name}</h4>
                          <p className="text-magical-starlight/70 text-sm">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all ${current === index ? "bg-magical-glowing-teal w-8" : "bg-magical-starlight/30 hover:bg-magical-starlight/50"}`} aria-label={`Go to testimonial ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </section>;
}