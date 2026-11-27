import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F7F7F7',
          tonal: '#EFEFEF',
        },
        surface: '#FFFFFF',
        ink: '#252525',
        muted: '#545454',
        slate: '#7D7D7D',
        hairline: '#CFCFCF',
        accent: {
          DEFAULT: '#252525',
          hover: '#545454',
          subtle: '#EFEFEF',
        },
        signal: {
          DEFAULT: '#991B1B',
          subtle: '#FEF2F2',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
