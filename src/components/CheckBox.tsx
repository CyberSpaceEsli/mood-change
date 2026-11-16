import { StyleSheet, View } from 'react-native';

import CheckSvg from '../../assets/icons/check.svg';

import { colors } from '@/constants/theme';

type CheckBoxProps = {
  checked: boolean;
  size?: number; // width and height of the box
  radius?: number; // corner radius
  checkedBackground?: string; // background while checked
  checkedBorderColor?: string; // outline while checked
};

// Visual only: the parent Pressable handles the tap and the accessibility role.
export function CheckBox({
  checked,
  size = 32,
  radius = 8,
  checkedBackground = colors.stepIdle,
  checkedBorderColor = '#2F6B6A66', // forest at 40%
}: CheckBoxProps) {
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size, borderRadius: radius },
        checked && {
          backgroundColor: checkedBackground,
          borderColor: checkedBorderColor,
        },
      ]}
    >
      {checked && (
        <CheckSvg width={Math.round(size / 2)} height={Math.round(size / 2)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2F6B6A66', // forest at 40%
    backgroundColor: colors.white,
  },
});
