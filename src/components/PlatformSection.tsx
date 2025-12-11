import { useDataset } from "@/hooks/useDataset";
import { Platform3DChart } from "./Platform3DChart";

export const PlatformSection = () => {
  const { loading, getPlatformStats, data } = useDataset();
  const platformStats = getPlatformStats();

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
              Toxicity Distribution by Platform
            </h2>
            <p className="text-lg text-navy-medium mb-8">
              Explore how toxicity scores are distributed across different social media platforms. 
              The violin shapes show the concentration of posts at different toxicity levels (0-100%), 
              with the red line indicating the mean. Drag to rotate the 3D chart.
            </p>
            
            <div className="space-y-4">
              {platformStats.map((stat, index) => {
                const color = ['#ffd02f', '#ffcb0f', '#ffcf54', '#ffe291'][index];
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
            <Platform3DChart data={platformStats} rawData={data} />
            <p className="text-center text-xs text-navy-medium mt-4 font-mono">
              Click and drag to rotate • Scroll to zoom • Red line = mean
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
      </div>
    </section>
  );
};
