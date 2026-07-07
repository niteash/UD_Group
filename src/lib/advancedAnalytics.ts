/**
 * Advanced Analytics for Award-Winning Sites
 * Track user interactions, engagement, and conversion
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AdvancedAnalytics {
  private sessionStart = Date.now();
  private scrollDepth = 0;
  private maxScrollDepth = 0;

  constructor() {
    if (typeof window === "undefined") return;

    this.sessionStart = Date.now();
    this.initTrackers();
  }

  private initTrackers() {
    // Track scroll depth
    const trackScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      this.scrollDepth = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100,
      );

      if (this.scrollDepth > this.maxScrollDepth) {
        this.maxScrollDepth = this.scrollDepth;

        // Track milestones
        if ([25, 50, 75, 90, 100].includes(this.maxScrollDepth)) {
          this.trackEvent({
            category: "Engagement",
            action: "Scroll Depth",
            label: `${this.maxScrollDepth}%`,
            value: this.maxScrollDepth,
          });
        }
      }
    };

    window.addEventListener("scroll", trackScroll, { passive: true });

    // Track time on page
    window.addEventListener("beforeunload", () => {
      const timeOnPage = Math.round((Date.now() - this.sessionStart) / 1000);

      this.trackEvent({
        category: "Engagement",
        action: "Time on Page",
        label: `${timeOnPage}s`,
        value: timeOnPage,
      });
    });

    // Track rage clicks
    let clickCount = 0;
    let clickTimer: ReturnType<typeof setTimeout> | null = null;

    document.addEventListener("click", (e) => {
      clickCount++;

      if (clickTimer !== null) {
        clearTimeout(clickTimer);
      }

      clickTimer = setTimeout(() => {
        if (clickCount >= 3) {
          const target = e.target as HTMLElement;

          this.trackEvent({
            category: "UX Issue",
            action: "Rage Click",
            label:
              target.tagName + (target.className ? `.${target.className}` : ""),
          });
        }

        clickCount = 0;
      }, 1000);
    });

    // Track dead clicks
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      const isInteractive = target.closest(
        'a, button, input, select, textarea, [role="button"]',
      );

      if (
        !isInteractive &&
        target.tagName !== "HTML" &&
        target.tagName !== "BODY"
      ) {
        this.trackEvent({
          category: "UX Issue",
          action: "Dead Click",
          label:
            target.tagName + (target.className ? `.${target.className}` : ""),
        });
      }
    });

    // Track form abandonment
    document.addEventListener(
      "focus",
      (e) => {
        const target = e.target as HTMLElement;

        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          const form = target.closest("form");

          if (form) {
            const formId = form.id || "unknown";

            const handleBeforeUnload = () => {
              const hasValue = (target as HTMLInputElement).value.length > 0;

              if (hasValue) {
                this.trackEvent({
                  category: "Conversion",
                  action: "Form Abandonment",
                  label: formId,
                });
              }

              window.removeEventListener("beforeunload", handleBeforeUnload);
            };

            window.addEventListener("beforeunload", handleBeforeUnload);
          }
        }
      },
      true,
    );
  }

  /**
   * Track custom event
   */
  public trackEvent(event: AnalyticsEvent) {
    // Google Analytics 4
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Console log in development
    if (import.meta.env.DEV) {
      console.log("📊 Analytics:", event);
    }
  }

  /**
   * Track page view
   */
  public trackPageView(path: string, title: string) {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("config", "GA_MEASUREMENT_ID", {
        page_path: path,
        page_title: title,
      });
    }
  }

  /**
   * Track conversion
   */
  public trackConversion(name: string, value?: number) {
    this.trackEvent({
      category: "Conversion",
      action: name,
      value,
    });
  }

  /**
   * Track error
   */
  public trackError(error: Error, context?: string) {
    this.trackEvent({
      category: "Error",
      action: error.name,
      label: `${context ? `${context}: ` : ""}${error.message}`,
    });
  }

  /**
   * Track CTA click
   */
  public trackCTA(label: string, location: string) {
    this.trackEvent({
      category: "CTA",
      action: "Click",
      label: `${label} - ${location}`,
    });
  }

  /**
   * Track video engagement
   */
  public trackVideo(
    action: "play" | "pause" | "complete",
    videoId: string,
    progress?: number,
  ) {
    this.trackEvent({
      category: "Video",
      action: action.charAt(0).toUpperCase() + action.slice(1),
      label: videoId,
      value: progress,
    });
  }
}

// Export singleton instance
export const analytics = new AdvancedAnalytics();

/**
 * React hook for tracking component visibility
 */
export function useVisibilityTracking(componentName: string) {
  if (typeof window === "undefined") return;

  const hasTracked = new Set<string>();

  return (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasTracked.has(componentName)) {
        analytics.trackEvent({
          category: "Visibility",
          action: "Component Viewed",
          label: componentName,
        });

        hasTracked.add(componentName);
      }
    });
  };
}
