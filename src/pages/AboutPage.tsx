
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import BiomeBackground from "@/components/BiomeBackground";
import VineHeading from "@/components/VineHeading";
import { useBiome } from "@/contexts/BiomeContext";

export default function AboutPage() {
  const { setCurrentBiome } = useBiome();
  
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    setCurrentBiome('forest');
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [setCurrentBiome]);

  return (
    <div className="min-h-screen text-archive-text relative overflow-hidden">
      <BiomeBackground biomeType="forest" />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <div className="barcode mb-4 inline-block">ARCHIVE_ABOUT_00123</div>
            <VineHeading level={1} biomeType="forest" className="text-5xl md:text-7xl font-headline uppercase tracking-wider mb-6">
              <span className="text-biome-forest">OWL</span>STIN
            </VineHeading>
          </div>
          
          <div className="archive-card p-8 rounded-sm mb-12 bg-archive-secondary/70 backdrop-blur-sm border border-biome-forest/30">
            <p className="text-lg mb-6 font-mono">
              Founded in 2023, Owlstin emerges from the convergence of advanced artificial intelligence and career development expertise, creating a powerful nexus that transforms how talent and opportunity connect in the modern professional landscape.
            </p>
            
            <p className="text-lg mb-6">
              Our distinguished team of AI researchers, career strategists, and industry veterans have crafted a sophisticated platform that transcends traditional job matching by identifying crucial skill alignments and providing strategic pathways for professional advancement.
            </p>
            
            <p className="text-lg">
              At Owlstin, we hold the conviction that every professional deserves a career trajectory that resonates with their innate talents. Through our proprietary algorithms and insightful guidance, we illuminate the path toward exceptional career fulfillment.
            </p>
          </div>
          
          <VineHeading className="text-3xl font-headline uppercase tracking-wider mb-6" biomeType="forest">
            MISSION STATEMENT
          </VineHeading>
          
          <div className="archive-card p-8 rounded-sm mb-12 bg-archive-secondary/70 backdrop-blur-sm border border-biome-forest/30">
            <p className="text-lg italic border-l-2 border-biome-forest pl-4">
              "To harness the transformative power of AI to forge connections between exceptional talent and ideal opportunities, empowering professionals to thrive in an evolving landscape while enabling organizations to discover their perfect match."
            </p>
          </div>
          
          <div className="ticker-wrap mb-12">
            <div className="ticker">
              <div className="ticker-item">TALENT DISCOVERY</div>
              <div className="ticker-item">CAREER ADVANCEMENT</div>
              <div className="ticker-item">SKILL ALIGNMENT</div>
              <div className="ticker-item">PROFESSIONAL DEVELOPMENT</div>
              <div className="ticker-item">TALENT DISCOVERY</div>
              <div className="ticker-item">CAREER ADVANCEMENT</div>
            </div>
          </div>
          
          <VineHeading className="text-3xl font-headline uppercase tracking-wider mb-6" biomeType="forest">
            THE TEAM
          </VineHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="archive-card p-6 rounded-sm text-center bg-archive-secondary/70 backdrop-blur-sm border border-biome-forest/20">
              <div className="w-24 h-24 bg-biome-forest/10 rounded-sm mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="font-headline text-xl mb-2 uppercase text-biome-forest">Aria Chen</h3>
              <p className="text-archive-muted">Founder & CEO</p>
              <p className="text-archive-text/70 mt-3 text-sm">
                Former AI Research Director at LinkedIn with expertise in neural networks and career trajectory optimization
              </p>
            </div>
            
            <div className="archive-card p-6 rounded-sm text-center bg-archive-secondary/70 backdrop-blur-sm border border-biome-forest/20">
              <div className="w-24 h-24 bg-biome-forest/10 rounded-sm mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🧙‍♂️</span>
              </div>
              <h3 className="font-headline text-xl mb-2 uppercase text-biome-forest">Marcus Wells</h3>
              <p className="text-archive-muted">CTO</p>
              <p className="text-archive-text/70 mt-3 text-sm">
                Distinguished AI researcher specializing in advanced natural language processing and comprehensive skills taxonomy architecture
              </p>
            </div>
            
            <div className="archive-card p-6 rounded-sm text-center bg-archive-secondary/70 backdrop-blur-sm border border-biome-forest/20">
              <div className="w-24 h-24 bg-biome-forest/10 rounded-sm mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍🎓</span>
              </div>
              <h3 className="font-headline text-xl mb-2 uppercase text-biome-forest">Elena Torres</h3>
              <p className="text-archive-muted">Head of Learning</p>
              <p className="text-archive-text/70 mt-3 text-sm">
                Former Director of Educational Innovation with 15+ years pioneering adaptive learning systems and professional development frameworks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
