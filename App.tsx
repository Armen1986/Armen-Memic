import React from 'react';
import Header from './components/Header';
import StorySection from './components/StorySection';

export default function App() {
  return (
    <div className="min-h-screen bg-dominant text-secondary antialiased selection:bg-accent selection:text-white">
      <Header />
      
      <main>
        <StorySection />
      </main>
      
      {/* Minimalist Luxury Footer */}
      <footer className="bg-white py-24 px-6 border-t border-secondary/5">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <div className="space-y-6">
            <h2 className="font-heading text-4xl md:text-5xl text-secondary">Begin Your Journey</h2>
            <p className="font-body text-secondary/60 max-w-md mx-auto leading-relaxed">
              Step into a space where time slows down and your true essence is invited to emerge.
            </p>
          </div>

          <button className="btn-luxury px-12 py-4 bg-secondary text-dominant uppercase text-xs tracking-[0.2em] font-bold hover:bg-accent transition-colors duration-500 shadow-xl">
            Inquire Now
          </button>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-secondary/5 text-xs text-secondary/40 uppercase tracking-wider font-body">
             <div className="text-center md:text-left">
               Based in San Francisco
             </div>
             <div className="text-center">
               © 2024 Rooted & Radiant Eros
             </div>
             <div className="text-center md:text-right hover:text-accent cursor-pointer transition-colors">
               Privacy & Etiquette
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}