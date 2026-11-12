import type { TextStyle } from 'react-native';

export const colors = {
  background: '#FDFCF6',
  white: '#FFFFFF',
  whiteOutline: '#FFFFFF80', // white at 50%
  outline: '#F4F3EF', // subtle off-grey border
  heroBackground: '#E5F0EA',
  forest: '#2F6B6A',
  forestIcon: '#2D605F', // selected tab icon
  mint: '#D6EADB',
  stepIdle: '#EEF5F0', // upcoming step box
  stepIdleOutline: '#C9DAD3', // upcoming step box outline
  stepLine: '#D9E2DE', // line connecting the step boxes
  yellow: '#F6D35F', // step counter label
  yellowLight: '#FAE6A8', // start of the step counter gradient
  ink900: '#1B3A40',
  ink600: '#3C5558',
  ink300: '#3B6F60',
  text: '#1B3A40', // default text color (Ink 900)
} as const;

// Each weight of a custom font is its own font family in React Native.
// Pick the weight through `fontFamily`, not `fontWeight`.
export const fonts = {
  lora: {
    regular: 'Lora_400Regular',
    medium: 'Lora_500Medium',
    semiBold: 'Lora_600SemiBold',
    bold: 'Lora_700Bold',
  },
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_800Bold',
  },
} as const;

// Inter for the title and body text, Lora for headings, questions, actions and quotes.
export const typography = {
  title: { fontFamily: fonts.inter.bold, fontSize: 26, lineHeight: 32 },
  titleSmall: { fontFamily: fonts.inter.bold, fontSize: 18, lineHeight: 26 },
  titleIntro: { fontFamily: fonts.inter.regular, fontSize: 13, lineHeight: 18 }, 
  heroIntro: { fontFamily: fonts.inter.medium, fontSize: 11, lineHeight: 16 },
  heroQuestion : { fontFamily: fonts.lora.medium, fontSize: 28, lineHeight: 34 },
  heroText: { fontFamily: fonts.inter.regular, fontSize: 14, lineHeight: 20 },
  heroButtonText: { fontFamily: fonts.inter.semiBold, fontSize: 16, lineHeight: 24 },
  heading: { fontFamily: fonts.lora.medium, fontSize: 22, lineHeight: 30 },
  body: { fontFamily: fonts.inter.regular, fontSize: 16, lineHeight: 24 },
  stepTitle: { fontFamily: fonts.inter.semiBold, fontSize: 16, lineHeight: 24 },
  stepLetter: { fontFamily: fonts.inter.semiBold, fontSize: 16, lineHeight: 24 },
  label: { fontFamily: fonts.inter.medium, fontSize: 14, lineHeight: 20 },
  labelNumber: { fontFamily: fonts.inter.semiBold, fontSize: 14, lineHeight: 20 },
  small: { fontFamily: fonts.inter.regular, fontSize: 12, lineHeight: 16 },
  link: { fontFamily: fonts.inter.medium, fontSize: 11, lineHeight: 14 },
  linkActive: { fontFamily: fonts.inter.semiBold, fontSize: 11, lineHeight: 14 },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;

export const spacing = {
  screen: 16, // left/right space between screen edge and content
} as const;
