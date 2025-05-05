
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ee01ae63da4a4e93866e2b2039ec2591',
  appName: 'elevate-career-nexus',
  webDir: 'dist',
  server: {
    url: 'https://ee01ae63-da4a-4e93-866e-2b2039ec2591.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#9b87f5",
      showSpinner: true,
      spinnerColor: "#ffffff",
    }
  }
};

export default config;
