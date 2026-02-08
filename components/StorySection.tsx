import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Star, Play } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    title: "The Awakening",
    category: "Somatic Reconnection",
    description: "A journey of rediscovering the body's innate language after years of dissociation.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Sacred Boundaries",
    category: "Intimacy Coaching",
    description: "Learning to speak 'no' with love, creating the safety required for true 'yes'.",
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=2093&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Erotic Innocence",
    category: "Deep Play",
    description: "Reclaiming the playful, uninhibited energy of eros in a shame-free container.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2064&auto=format&fit=crop"
  }
];

export default function StorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setVisibleItems(prev => new Set(prev).add(id));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -window.innerWidth * 0.6 : window.innerWidth * 0.6;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-dominant text-secondary overflow-hidden">
      
      {/* 1. Hero / Philosophy Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative">
        {/* Parallax Background Element */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        
        <div 
          className="max-w-4xl text-center space-y-8 z-10 reveal-on-scroll opacity-0 transition-all duration-1000 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 translate-y-10"
          data-id="0"
          style={{ opacity: visibleItems.has(0) ? 1 : 0, transform: visibleItems.has(0) ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold font-body">
            The Philosophy
          </span>
          <h1 className="font-heading text-6xl md:text-8xl leading-[1.1] font-normal text-secondary">
            Intimacy is an <br/>
            <span className="font-accent italic text-accent relative inline-block">
              Art Form
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="font-heading text-2xl md:text-3xl text-secondary/70 font-light max-w-2xl mx-auto leading-relaxed pt-8">
            We move beyond the physical into the realm of the energetic. 
            Here, silence speaks louder than words.
          </p>
          
          <div className="pt-8">
            <button className="btn-luxury px-8 py-3 border border-secondary/20 text-secondary text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors">
              Explore The Method
            </button>
          </div>
        </div>
      </section>

      {/* 2. Horizontal Scroll Gallery */}
      <section className="min-h-screen flex flex-col justify-center py-20 relative">
        <div className="px-8 md:px-16 mb-12 flex justify-between items-end">
          <div className="reveal-on-scroll" data-id="100" style={{ opacity: visibleItems.has(100) ? 1 : 0, transition: 'all 1s' }}>
            <span className="block text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4">Selected Journeys</span>
            <h2 className="font-heading text-5xl md:text-6xl text-secondary">Case Studies</h2>
          </div>
          
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')} 
              className="p-4 rounded-full border border-secondary/10 hover:border-accent hover:text-accent transition-all duration-300 group btn-luxury"
              aria-label="Scroll Left"
            >
              <ArrowRight className="rotate-180 w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="p-4 rounded-full border border-secondary/10 hover:border-accent hover:text-accent transition-all duration-300 group btn-luxury"
              aria-label="Scroll Right"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Gallery Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 px-8 md:px-16 pb-12 scrollbar-hide snap-x snap-mandatory"
        >
          {CASE_STUDIES.map((study, index) => (
            <div 
              key={study.id} 
              data-id={study.id}
              className="min-w-[85vw] md:min-w-[600px] h-[70vh] relative snap-center group cursor-pointer overflow-hidden transition-all duration-500 reveal-on-scroll"
              style={{ 
                opacity: visibleItems.has(study.id) ? 1 : 0, 
                transform: visibleItems.has(study.id) ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`
              }}
            >
              <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/20 transition-all duration-500 z-10"></div>
              
              {/* Image Zoom Effect */}
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent text-dominant">
                <span className="text-accent text-xs tracking-[0.2em] uppercase mb-3 block opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {study.category}
                </span>
                <h3 className="font-heading text-4xl md:text-5xl mb-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {study.title}
                </h3>
                <p className="font-body text-dominant/90 font-light max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 leading-relaxed">
                  {study.description}
                </p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  <span className="inline-flex items-center gap-3 text-accent border-b border-accent/50 pb-1 text-xs tracking-widest uppercase hover:text-white hover:border-white transition-colors">
                    Read Story <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="min-w-[4rem] h-full snap-center"></div>
        </div>
      </section>

      {/* 3. Quote Section with subtle animation */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 relative bg-white">
        <div className="max-w-4xl mx-auto text-center relative reveal-on-scroll" data-id="999" style={{ opacity: visibleItems.has(999) ? 1 : 0, transition: 'opacity 1.5s ease' }}>
          <Star className="w-6 h-6 text-accent mx-auto mb-10 animate-[spin_10s_linear_infinite]" fill="#D4AF37" fillOpacity={0.2} />
          
          <blockquote className="font-heading text-4xl md:text-5xl leading-tight text-secondary">
            "The body is not a thing to be touched, <br />
            but a place to be <span className="text-accent font-accent italic">entered</span>."
          </blockquote>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-accent/50"></div>
            <cite className="text-[10px] uppercase tracking-[0.25em] text-secondary/60 not-italic font-body">Client Reflection, 2024</cite>
            <div className="h-[1px] w-8 bg-accent/50"></div>
          </div>
        </div>
      </section>

    </div>
  );
}