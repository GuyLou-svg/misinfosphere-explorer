import { useDataset } from "@/hooks/useDataset";
import { Platform3DChart } from "./Platform3DChart";

export const PlatformSection = () => {
  const { loading, getPlatformStats } = useDataset();
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
    <section id="platforms" className="py-24 px-6 bg-secondary/20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase mb-4">
              Platform Analysis
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Engagement by Platform
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Compare average engagement levels across different social media platforms. 
              Drag to rotate the 3D chart and explore the data from different angles.
            </p>
            
            <div className="space-y-4">
              {platformStats.map((stat, index) => (
                <div 
                  key={stat.platform}
                  className="flex items-center justify-between p-4 bg-card/50 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: ['#f5c842', '#d4a83a', '#b38f32', '#92762a'][index] 
                      }}
                    />
                    <span className="font-medium text-foreground">{stat.platform}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-foreground">{stat.avgEngagement.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">avg engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Platform3DChart data={platformStats} />
            <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
              Click and drag to rotate • Scroll to zoom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
