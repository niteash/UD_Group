/**
 * Advanced Performance Monitoring
 * Track Core Web Vitals and custom metrics like award-winning sites
 */

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  tti?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window === 'undefined') return;
    this.initObservers();
  }

  private initObservers() {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        
        if (lastEntry) {
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
          this.reportMetric('LCP', this.metrics.lcp);
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP not supported');
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as PerformanceEntry & {
            processingStart?: number;
            startTime: number;
          };
          
          if (fidEntry.processingStart) {
            this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          }
        }
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value || 0;
            this.metrics.cls = clsValue;
          }
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS not supported');
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.reportMetric('FCP', this.metrics.fcp);
          }
        }
      });
      
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn('FCP not supported');
    }

    // Time to First Byte (TTFB)
    if ('navigation' in performance && 'getEntriesByType' in performance) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.reportMetric('TTFB', this.metrics.ttfb);
      }
    }
  }

  private reportMetric(name: string, value: number) {
    // Color-code the console output based on thresholds
    const getColor = (metricName: string, val: number): string => {
      const thresholds: Record<string, { good: number; poor: number }> = {
        LCP: { good: 2500, poor: 4000 },
        FID: { good: 100, poor: 300 },
        CLS: { good: 0.1, poor: 0.25 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 },
      };

      const threshold = thresholds[metricName];
      if (!threshold) return 'blue';

      if (val <= threshold.good) return 'green';
      if (val <= threshold.poor) return 'orange';
      return 'red';
    };

    const color = getColor(name, value);
    const icon = color === 'green' ? '✓' : color === 'orange' ? '⚠' : '✗';
    
    console.log(
      `%c${icon} ${name}: ${Math.round(value)}${name === 'CLS' ? '' : 'ms'}`,
      `color: ${color}; font-weight: bold; font-size: 12px;`
    );

    // Send to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        event_label: navigator.userAgent,
        non_interaction: true,
      });
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Report custom performance marks
   */
  public mark(name: string) {
    if ('mark' in performance) {
      performance.mark(name);
    }
  }

  /**
   * Measure time between two marks
   */
  public measure(name: string, startMark: string, endMark: string) {
    if ('measure' in performance) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        if (measure) {
          console.log(`⏱ ${name}: ${Math.round(measure.duration)}ms`);
        }
      } catch (e) {
        console.warn('Measurement failed:', e);
      }
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitoring() {
  return performanceMonitor.getMetrics();
}
