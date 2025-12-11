import { useDataset } from "@/hooks/useDataset";
import { Platform3DChart } from "./Platform3DChart";

const PLATFORM_COLORS = ['#ffd02f', '#ffcb0f', '#ffcf54', '#ffe291'];

export const PlatformSection = () => {
  const { loading, getPlatformStats, getToxicityDistribution } = useDataset();
  const platformStats = getPlatformStats();
  const violinData = getToxicityDistribution();

  if (loading) {
    return (
      <section id="platforms" className="py-24 px-6 bg-secondary/20">
        <div className="container mx-auto text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="platforms" className="py-24 px-6 bg-white-soft text-navy-deep">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono text-navy-medium tracking-[0.3em] uppercase mb-4">
              Platform Analysis
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-navy-deep mb-6">
              Toxicity Distribution
            </h2>
            <p className="text-lg text-navy-medium mb-8">
              Violin plots showing the distribution of toxicity scores across platforms. 
              Wider sections indicate more posts at that toxicity level. White line shows the mean.
            </p>
            
            <div className="space-y-4">
              {platformStats.map((stat, index) => {
                const color = PLATFORM_COLORS[index];
                return (
                  <div 
                    key={stat.platform}
                    className="flex items-center justify-between p-4 bg-white-pure border border-navy-light/20 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-medium" style={{ color }}>{stat.platform}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-navy-deep">{(stat.avgToxicity * 100).toFixed(1)}%</p>
                      <p className="text-xs text-navy-medium">avg toxicity</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <Platform3DChart data={violinData} colors={PLATFORM_COLORS} />
            <p className="text-center text-xs text-navy-medium mt-4 font-mono">
              Click and drag to rotate • Scroll to zoom • White line = mean
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
