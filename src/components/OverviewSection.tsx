import { useDataset } from "@/hooks/useDataset";
import { StatCard } from "./StatCard";

export const OverviewSection = () => {
  const { loading, getTotalStats } = useDataset();
  const stats = getTotalStats();

  if (loading) {
    return (
      <section id="overview" className="py-24 px-6">
        <div className="container mx-auto text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="overview" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Dataset Overview
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Numbers
          </h2>
          <div className="section-divider max-w-md mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Posts"
            value={stats.totalPosts}
            subtext="Analyzed entries"
            delay={100}
          />
          <StatCard
            label="Misinformation"
            value={stats.misinformationCount}
            subtext={`${((stats.misinformationCount / stats.totalPosts) * 100).toFixed(1)}% of total`}
            delay={200}
          />
          <StatCard
            label="Avg. Toxicity"
            value={(stats.avgToxicity * 100).toFixed(1) + '%'}
            subtext="Mean toxicity score"
            delay={300}
          />
          <StatCard
            label="Platforms"
            value={stats.platforms}
            subtext="Social networks analyzed"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};
