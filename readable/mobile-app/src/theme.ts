// ============================================================
//  Readable – Design System / Theme Tokens
// ============================================================

export const Colors = {
  // Brand
  primary: '#6C63FF',
  primaryLight: '#9B95FF',
  primaryDark: '#4A43D0',
  secondary: '#FF6584',
  accent: '#43CBFF',

  // Gradients (start → end pairs)
  gradientHero: ['#6C63FF', '#43CBFF'] as const,
  gradientCard: ['#1E1B4B', '#312E81'] as const,
  gradientSuccess: ['#43E97B', '#38F9D7'] as const,
  gradientWarm: ['#F093FB', '#F5576C'] as const,
  gradientCool: ['#4FACFE', '#00F2FE'] as const,

  // Background
  bgDark: '#0D0B1E',
  bgCard: '#16132F',
  bgSurface: '#1E1B4B',
  bgMuted: '#2D2A5E',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A5A3C8',
  textMuted: '#6B6896',
  textInverse: '#0D0B1E',

  // Semantic
  success: '#43E97B',
  warning: '#F6C90E',
  error: '#FF6584',
  info: '#43CBFF',

  // Borders
  border: '#2D2A5E',
  borderLight: '#3D3A7E',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 21,
  xxl: 26,
  xxxl: 34,
  display: 44,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
};
