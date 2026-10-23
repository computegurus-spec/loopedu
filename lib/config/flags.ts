// ==============================================================================
// Application Mode & Feature Flags Configuration
// ==============================================================================

export type AppMode = 'demo' | 'live';

export interface AppConfig {
  mode: AppMode;
  timezone: string;
  baseUrl: string;
  features: {
    minorOnboarding: boolean;
    minorCoach: boolean;
    contextualAds: boolean;
    livePayments: boolean;
    liveEmailSending: boolean;
    adultRecruitment: boolean;
  };
}

export const appConfig: AppConfig = {
  mode: (process.env.NEXT_PUBLIC_APP_MODE as AppMode) || (process.env.APP_MODE as AppMode) || 'demo',
  timezone: process.env.APP_TIMEZONE || 'Asia/Kolkata',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  features: {
    minorOnboarding: process.env.MINOR_ONBOARDING_ENABLED === 'true',
    minorCoach: process.env.MINOR_COACH_ENABLED === 'true',
    contextualAds: process.env.ADS_ENABLED === 'true',
    livePayments: process.env.LIVE_PAYMENTS_ENABLED === 'true',
    liveEmailSending: process.env.EMAIL_SENDING_ENABLED === 'true',
    adultRecruitment: true, // Always accessible via adult onboarding flow
  },
};

export const featureFlags = appConfig.features;

export const isDemoMode = (): boolean => {
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem('loopedu_app_mode');
    if (override === 'demo' || override === 'live') return override === 'demo';
  }
  return appConfig.mode === 'demo';
};

