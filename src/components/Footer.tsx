export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-foreground">
              MISINFO<span className="text-muted-foreground">.VIZ</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            A data visualization project exploring AI-generated misinformation patterns.
          </p>
          
          <p className="text-xs font-mono text-muted-foreground">
            College Project • 2024
          </p>
        </div>
      </div>
    </footer>
  );
};
