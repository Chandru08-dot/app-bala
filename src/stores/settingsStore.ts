import { create } from 'zustand';

interface SettingsState {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  fontFamily: 'Inter' | 'OpenDyslexic';
  setFontSize: (size: number) => void;
  setLetterSpacing: (spacing: number) => void;
  setLineHeight: (height: number) => void;
  setFontFamily: (family: 'Inter' | 'OpenDyslexic') => void;
}

export const useSettings = create<SettingsState>((set) => ({
  fontSize: 24,
  letterSpacing: 0,
  lineHeight: 1.8,
  fontFamily: 'Inter',
  setFontSize: (size) => set({ fontSize: size }),
  setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
  setLineHeight: (height) => set({ lineHeight: height }),
  setFontFamily: (family) => set({ fontFamily: family }),
}));
