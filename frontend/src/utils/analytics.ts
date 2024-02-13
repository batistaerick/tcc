import { AnalyticsArgs, TrackOptions } from '@/types/types';

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;

  constructor(options?: AnalyticsArgs) {
    if (options?.retention) {
      this.retention = options.retention;
    }
  }

  async track(namespace: string, event: object = {}, options?: TrackOptions) {
    // postFetcher<>();
  }

  async retrieve(namespace: string) {
    // postFetcher<>();
  }
}
