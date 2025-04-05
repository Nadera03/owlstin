
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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Belmont",
    role: "Software Developer",
    company: "Spellbound Tech",
    text: "Owlstin helped me identify key skills I was missing and provided a magical roadmap to land my dream job. The AI recommendations were spot-on!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Daniel Morris",
    role: "UX Designer",
    company: "Wizardry Interfaces",
    text: "The skill gap analysis was incredibly accurate. I followed the learning path and secured 3 job interviews within a month. Simply magical!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Hermione Graves",
    role: "Product Manager",
    company: "Enchanted Products Inc.",
    text: "As someone switching careers, Owlstin made the transition seamless. The AI understood exactly what skills I needed to develop.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/66.jpg"
  },
  {
    id: 4,
    name: "Ron Williams",
    role: "Data Analyst",
    company: "Crystal Ball Analytics",
    text: "The personalized learning resources were incredibly helpful. I went from rejection letters to multiple offers in just 8 weeks.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id: 5,
    name: "Luna Tepes",
    role: "AI Researcher",
    company: "Magical Algorithms Ltd",
    text: "Owlstin's recommendations were like having a career mentor who truly understood my strengths and aspirations. Truly enchanting!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/76.jpg"
  }
];

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
  
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-vampire font-bold text-center mb-16 text-castlevania-blood">
          Voices from the Shadows
        </h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
            <button
              onClick={scrollPrev}
              className="bg-castlevania-blood text-castlevania-parchment p-2 rounded-full hover:bg-castlevania-gold hover:text-castlevania-shadow transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
            <button
              onClick={scrollNext}
              className="bg-castlevania-blood text-castlevania-parchment p-2 rounded-full hover:bg-castlevania-gold hover:text-castlevania-shadow transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Carousel */}
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className={`${isMobile ? "basis-full" : "basis-1/3"} pl-4 md:pl-6`}>
                  <Card className="castlevania-card h-full">
                    <CardContent className="p-6">
                      {/* Blood drops at corners */}
                      <div className="absolute top-0 left-0 w-2 h-8 blood-drip" style={{animationDelay: "0.2s"}}></div>
                      <div className="absolute top-0 right-0 w-2 h-6 blood-drip" style={{animationDelay: "1.3s"}}></div>
                      
                      {/* Stars */}
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? "text-castlevania-gold fill-castlevania-gold" : "text-castlevania-stone"}`}
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-castlevania-parchment/90 mb-6 h-32 overflow-hidden">"{testimonial.text}"</p>
                      
                      {/* Author */}
                      <div className="flex items-center">
                        <div className="mr-4 relative gothic-border rounded-full overflow-hidden">
                          <img 
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-castlevania-gold font-gothic font-bold">{testimonial.name}</h4>
                          <p className="text-castlevania-parchment/70 text-sm">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index 
                    ? "bg-castlevania-blood w-8" 
                    : "bg-castlevania-parchment/30 hover:bg-castlevania-parchment/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
