import { useDataset } from "@/hooks/useDataset";
import { Toxicity3DScatter } from "./Toxicity3DScatter";

export const ToxicitySection = () => {
  const { loading, getScatterData } = useDataset();
  const scatterData = getScatterData();

  if (loading) {
    return (
      <section id="toxicity" className="py-24 px-6">
        <div className="container mx-auto text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="toxicity" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Toxicity3DScatter data={scatterData} />
            <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
              Hover over points for details • Drag to rotate
            </p>
          </div>
          
          <div className="order-1 lg:order-2">
            <p className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase mb-4">
              Toxicity Analysis
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Toxicity vs Engagement
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore the relationship between toxicity scores and engagement metrics. 
              Yellow points indicate misinformation, while navy points represent verified content.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Misinformation</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {scatterData.filter(d => d.isMisinformation).length}
                </p>
              </div>
              
              <div className="p-4 bg-white-pure/10 border border-white-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-white-soft" />
                  <span className="text-sm text-muted-foreground">Verified</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {scatterData.filter(d => !d.isMisinformation).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
