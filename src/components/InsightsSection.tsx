import { useDataset } from "@/hooks/useDataset";

export const InsightsSection = () => {
  const { loading, getPlatformStats, getTotalStats } = useDataset();
  const platformStats = getPlatformStats();
  const totalStats = getTotalStats();

  const insights = [
    {
      title: "Misinformation Rate",
      description: `${((totalStats.misinformationCount / totalStats.totalPosts) * 100).toFixed(1)}% of all analyzed posts contain misinformation, highlighting the scale of the problem across platforms.`,
      metric: `${totalStats.misinformationCount} posts`,
    },
    {
      title: "Toxicity Distribution",
      description: "Toxicity scores are distributed across all levels, with varying patterns per platform. Higher engagement often correlates with moderate toxicity.",
      metric: `${(totalStats.avgToxicity * 100).toFixed(1)}% avg`,
    },
    {
      title: "Platform Variance",
      description: "Engagement levels vary significantly between platforms, with some showing higher susceptibility to viral misinformation content.",
      metric: `${platformStats.length} platforms`,
    },
  ];

  if (loading) {
    return (
      <section id="insights" className="py-24 px-6 bg-secondary/20">
        <div className="container mx-auto text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="insights" className="py-24 px-6 bg-white-soft text-navy-deep">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono text-navy-medium tracking-[0.3em] uppercase mb-4">
            Key Findings
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-deep mb-4">
            Insights
          </h2>
          <div className="section-divider max-w-md mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div
              key={insight.title}
              className="p-8 bg-white-pure border border-navy-light/20 rounded-lg shadow-sm animate-fade-up opacity-0"
              style={{ 
                animationDelay: `${index * 150}ms`, 
                animationFillMode: 'forwards' 
              }}
            >
              <div className="mb-4">
                <span className="inline-block text-xs font-mono bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  {insight.metric}
                </span>
              </div>
              <h3 className="text-xl font-bold text-navy-deep mb-3">
                {insight.title}
              </h3>
              <p className="text-navy-medium leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-white-pure border border-navy-light/20 rounded-lg shadow-sm">
            <p className="text-sm text-navy-medium mb-2">Dataset Source</p>
            <p className="text-lg font-mono text-navy-deep">
              Synthetic Misinformation Dataset
            </p>
            <p className="text-sm text-navy-medium mt-2">
              500 entries • 4 platforms • Multi-dimensional analysis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
