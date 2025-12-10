export interface DataPoint {
  id: number;
  post_id: string;
  platform: string;
  timestamp: string;
  date: string;
  time: string;
  month: string;
  weekday: string;
  country: string;
  city: string;
  timezone: string;
  author_id: string;
  author_followers: number;
  author_verified: number;
  text: string;
  text_length: number;
  token_count: number;
  readability_score: number;
  num_urls: number;
  num_mentions: number;
  num_hashtags: number;
  sentiment_score: number;
  toxicity_score: number;
  model_signature: string;
  detected_synthetic_score: number;
  embedding_sim_to_facts: number;
  factcheck_verdict: string;
  external_factchecks_count: number;
  source_domain_reliability: number;
  engagement: number;
  is_misinformation: number;
}

export interface PlatformStats {
  platform: string;
  totalPosts: number;
  avgEngagement: number;
  avgToxicity: number;
  misinformationRate: number;
  avgSentiment: number;
}

export interface ChartDataPoint {
  platform: string;
  engagement: number;
  toxicity: number;
  isMisinformation: boolean;
  x: number;
  y: number;
  z: number;
}
