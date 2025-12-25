import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Xandeum Brand Colors
        primary: {
          DEFAULT: '#00D4AA',
          dark: '#00B894',
        },
        secondary: {
          DEFAULT: '#1E3A5F',
        },
        dark: '#0A1929',
        darker: '#061320',
        
        // Semantic Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        muted: '#64748B',
      },
      
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #061320 0%, #0A1929 50%, #1E3A5F 100%)',
      },
    },
  },
  plugins: [],
};

export default config;