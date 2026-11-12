import { Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyVariant } from '@/constants/theme';

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
};

export function AppText({ variant = 'body', style, ...rest }: AppTextProps) {
  return <Text style={[{ color: colors.text }, typography[variant], style]} {...rest} />;
}
