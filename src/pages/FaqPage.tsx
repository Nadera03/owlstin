
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FaqPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does Owlstin analyze my skills?",
      answer: "Owlstin uses advanced natural language processing to analyze your resume and compare it with job descriptions. Our AI identifies both matching skills and gaps, then provides tailored recommendations based on industry standards and current market demands.",
      category: "general",
    },
    {
      question: "Is my resume data secure?",
      answer: "Absolutely. We take data privacy very seriously. Your resume data is encrypted, stored securely, and never shared with third parties without your explicit consent. You can request deletion of your data at any time.",
      category: "privacy",
    },
    {
      question: "How accurate is the skill matching?",
      answer: "Our skill matching algorithm has been trained on millions of job descriptions and resumes, achieving a 92% accuracy rate in identifying relevant skills. We continuously improve our models based on feedback and outcomes.",
      category: "technical",
    },
    {
      question: "Can I use Owlstin if I'm changing careers?",
      answer: "Absolutely! Owlstin is especially helpful for career changers. It can identify transferable skills you already have and create focused learning paths for the new skills you need to acquire for your desired role.",
      category: "usage",
    },
    {
      question: "Do I need to install any software?",
      answer: "No, Owlstin is entirely web-based. You can access all features from any modern web browser without needing to download or install anything.",
      category: "technical",
    },
    {
      question: "How often should I analyze my resume?",
      answer: "We recommend analyzing your resume every time you're applying for a new position, after gaining new skills, or every 3-6 months to stay current with industry trends and requirements.",
      category: "usage",
    },
    {
      question: "What makes Owlstin different from other resume tools?",
      answer: "Unlike standard resume checkers, Owlstin provides actionable learning pathways, not just analysis. We combine AI skill matching with personalized education resources and progress tracking to actually close the skill gaps we identify.",
      category: "general",
    },
    {
      question: "Can recruiters see my profile?",
      answer: "Only if you choose to make it visible. Owlstin gives you complete control over your data visibility. You can keep your profile private, share it with specific recruiters, or make it discoverable in our talent marketplace.",
      category: "privacy",
    },
    {
      question: "How are the learning resources selected?",
      answer: "Our AI recommends resources based on your learning style, current skill level, and career goals. We curate high-quality content from respected educational platforms, industry experts, and open-source communities.",
      category: "technical",
    },
    {
      question: "What if I disagree with the skill assessment?",
      answer: "You can always provide feedback on any skill assessment. Our system allows you to dispute or refine skill ratings, and this feedback helps improve our AI for future analyses.",
      category: "usage",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-magical-starlight/70 text-lg max-w-xl mx-auto">
            Find answers to common questions about Owlstin's magical career guidance.
          </p>
        </div>
        
        <div className="magical-card p-8 rounded-xl mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-magical-starlight/50" />
            <Input
              type="text"
              placeholder="Search frequently asked questions..."
              className="pl-10 bg-magical-midnight/50 border-magical-glowing-teal/30 focus:border-magical-glowing-teal/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="magical-card rounded-xl border-none">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-medium text-magical-starlight">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-magical-starlight/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 magical-card rounded-xl">
                <p className="text-magical-starlight/70">No results found for "{searchQuery}"</p>
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
