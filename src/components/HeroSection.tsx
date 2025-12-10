import { HeroScene } from './HeroScene';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />
      
      <div className="container relative z-10 px-6 text-center">
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <p className="text-sm font-mono text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Data Visualization Project
          </p>
        </div>
        
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-up opacity-0"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <span className="text-foreground">Mapping</span>
          <br />
          <span className="text-gradient glow-text">Misinformation</span>
        </h1>
        
        <p 
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 animate-fade-up opacity-0"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          An interactive exploration of synthetic datasets analyzing toxicity, 
          engagement, and misinformation patterns across social platforms.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <a
            href="#overview"
            className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
          >
            <span>Explore Data</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          
          <a
            href="#insights"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 font-semibold transition-all duration-300 hover:border-primary hover:text-primary"
          >
            Key Insights
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float">
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};
