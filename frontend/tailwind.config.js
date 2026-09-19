/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base & Surfaces
        background: '#f8f9ff',
        'on-background': '#081c32',
        surface: '#f8f9ff',
        'surface-dim': '#c9dbf9',
        'surface-bright': '#f8f9ff',
        'surface-variant': '#d3e3ff',
        'surface-gray': '#F8FAFC',
        'surface-lowest': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e6eeff',
        'surface-container-high': '#dde9ff',
        'surface-container-highest': '#d3e3ff',
        'on-surface': '#081c32',
        'on-surface-variant': '#42474e',
        'inverse-surface': '#1f3148',
        'inverse-on-surface': '#ebf1ff',
        'surface-tint': '#37618b',

        // Borders & Outlines
        'border-subtle': '#E2E8F0',
        outline: '#72777f',
        'outline-variant': '#c2c7cf',

        // Primary (Corporate Navy)
        primary: '#002643',
        'primary-container': '#073c64',
        'on-primary': '#ffffff',
        'on-primary-container': '#7fa7d5',
        'inverse-primary': '#a1cafa',
        'primary-fixed': '#d0e4ff',
        'primary-fixed-dim': '#a1cafa',
        'on-primary-fixed': '#001d35',
        'on-primary-fixed-variant': '#1c4972',

        // Secondary (Yellow/Gold Action)
        secondary: '#755b00',
        'secondary-container': '#fdcb2c',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#6f5600',
        'secondary-fixed': '#ffe08f',
        'secondary-fixed-dim': '#f1c01f',
        'on-secondary-fixed': '#241a00',
        'on-secondary-fixed-variant': '#584400',

        // Tertiary (Cyan-Blue Accent)
        tertiary: '#002933',
        'tertiary-container': '#00404f',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#37b1d3',
        'tertiary-fixed': '#b5ebff',
        'tertiary-fixed-dim': '#64d4f7',
        'on-tertiary-fixed': '#001f28',
        'on-tertiary-fixed-variant': '#004e60',

        // Status
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        'success-emerald': '#10B981',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem', // 4px
        sm: '0.125rem', // 2px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        full: '9999px',
      },
      spacing: {
        gutter: '24px',
        'section-v-padding': '80px',
        'margin-mobile': '16px',
        'container-max': '1280px',
        'stack-lg': '32px',
        'stack-sm': '8px',
        'stack-md': '16px',
      },
      boxShadow: {
        level1: '0 4px 6px -1px rgba(26, 44, 67, 0.05)',
        level2: '0 10px 15px -3px rgba(26, 44, 67, 0.1)',
        glow: '0 0 15px rgba(253, 203, 44, 0.35)',
      },
    },
  },
  plugins: [],
};
