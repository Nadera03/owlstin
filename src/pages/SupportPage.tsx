import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeartHandshake, MessageSquare, Mail, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function SupportPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  const {
    toast
  } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Support request submitted",
        description: "We'll get back to you as soon as possible."
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: ""
      });
    }, 1500);
  };
  return <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent mb-6">
            Customer Support
          </h1>
          <p className="text-magical-starlight/70 text-lg">
            We're here to help with any questions or issues you might encounter.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="magical-card p-8 rounded-xl">
            <h2 className="text-2xl font-cinzel font-bold mb-6 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-magical-glowing-teal" />
              Get in Touch
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-magical-midnight/50 border-magical-glowing-teal/30 focus:border-magical-glowing-teal/70" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-magical-midnight/50 border-magical-glowing-teal/30 focus:border-magical-glowing-teal/70" />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Issue Category
                </label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-magical-midnight/50 border-magical-glowing-teal/30 focus:border-magical-glowing-teal/70">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="billing">Billing Questions</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="feedback">Feature Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="bg-magical-midnight/50 border-magical-glowing-teal/30 focus:border-magical-glowing-teal/70" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Your Message
                </label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="bg-magical-midnight/50 border-magical-glowing-teal/30 focus:border-magical-glowing-teal/70" />
              </div>
              
              <Button type="submit" className="magical-button w-full" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          {/* Support Info */}
          <div className="space-y-6">
            <div className="magical-card p-6 rounded-xl">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <HeartHandshake className="h-10 w-10 text-magical-glowing-teal" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-xl mb-2">Dedicated Support</h3>
                  <p className="text-magical-starlight/70">
                    Our support team is composed of career specialists and technical experts ready to assist you with any issues.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="magical-card p-6 rounded-xl">
              <h3 className="font-cinzel font-bold text-xl mb-4">Contact Methods</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-magical-glowing-teal mr-3" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <a href="mailto:support@owlstin.io" className="text-magical-glowing-teal hover:underline">nadera.aibusiness@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-magical-glowing-teal mr-3" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-magical-starlight/70">+91 1234056789</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-magical-glowing-teal mr-3" />
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-magical-starlight/70">Nadera.AI</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="magical-card p-6 rounded-xl">
              <h3 className="font-cinzel font-bold text-xl mb-4">FAQs</h3>
              <p className="text-magical-starlight/70 mb-4">
                Find quick answers to common questions on our FAQ page.
              </p>
              <Button variant="outline" className="w-full border-magical-glowing-teal/50 hover:border-magical-glowing-teal/80 hover:bg-magical-glowing-teal/5" asChild>
                <a href="/faq">Visit FAQ Page</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}