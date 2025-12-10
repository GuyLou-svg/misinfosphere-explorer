import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { DataPoint, PlatformStats, ChartDataPoint } from '@/types/data';

export const useDataset = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/misinformation_dataset.csv');
        const csvText = await response.text();
        
        Papa.parse<DataPoint>(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data.filter(row => row.id));
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to load dataset');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPlatformStats = (): PlatformStats[] => {
    const platforms = ['Reddit', 'Twitter', 'Facebook', 'Telegram'];
    
    return platforms.map(platform => {
      const platformData = data.filter(d => d.platform === platform);
      const total = platformData.length;
      
      return {
        platform,
        totalPosts: total,
        avgEngagement: total > 0 
          ? platformData.reduce((sum, d) => sum + (d.engagement || 0), 0) / total 
          : 0,
        avgToxicity: total > 0 
          ? platformData.reduce((sum, d) => sum + (d.toxicity_score || 0), 0) / total 
          : 0,
        misinformationRate: total > 0 
          ? (platformData.filter(d => d.is_misinformation === 1).length / total) * 100 
          : 0,
        avgSentiment: total > 0 
          ? platformData.reduce((sum, d) => sum + (d.sentiment_score || 0), 0) / total 
          : 0,
      };
    });
  };

  const getScatterData = (): ChartDataPoint[] => {
    return data.slice(0, 200).map((d, i) => ({
      platform: d.platform,
      engagement: d.engagement || 0,
      toxicity: d.toxicity_score || 0,
      isMisinformation: d.is_misinformation === 1,
      x: (d.toxicity_score || 0) * 4 - 2,
      y: ((d.engagement || 0) / 10000) * 3 - 1,
      z: (Math.random() - 0.5) * 2,
    }));
  };

  const getTotalStats = () => ({
    totalPosts: data.length,
    misinformationCount: data.filter(d => d.is_misinformation === 1).length,
    avgToxicity: data.length > 0 
      ? data.reduce((sum, d) => sum + (d.toxicity_score || 0), 0) / data.length 
      : 0,
    avgEngagement: data.length > 0 
      ? data.reduce((sum, d) => sum + (d.engagement || 0), 0) / data.length 
      : 0,
    platforms: [...new Set(data.map(d => d.platform))].length,
  });

  return {
    data,
    loading,
    error,
    getPlatformStats,
    getScatterData,
    getTotalStats,
  };
};
