import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  delay?: number;
}

export const StatCard = ({ label, value, subtext, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className="stat-card card-glow p-6 border border-border rounded-lg animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2">
        {label}
      </p>
      <p className="text-4xl md:text-5xl font-bold text-foreground mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {subtext && (
        <p className="text-sm text-muted-foreground">{subtext}</p>
      )}
    </div>
  );
};
