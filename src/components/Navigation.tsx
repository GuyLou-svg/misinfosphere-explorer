import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Platforms", href: "#platforms" },
  { label: "Toxicity", href: "#toxicity" },
  { label: "Insights", href: "#insights" },
];

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-lg font-semibold text-foreground">
              MISINFO<span className="text-muted-foreground">.VIZ</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-sm font-medium tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="text-xs font-mono text-muted-foreground tracking-wider">
            August 2025
          </div>
        </div>
      </div>
    </nav>
  );
};
