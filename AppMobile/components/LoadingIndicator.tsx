import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Spinner, SpinnerProps } from '@ui-kitten/components';

interface LoadingIndicatorProps extends SpinnerProps {
  style?: ViewStyle;
  flexOne?: boolean;
}

const LoadingIndicator = memo(({ style, flexOne, ...rest }: LoadingIndicatorProps) => {
  return (
    <View style={[styles.container, { flex: flexOne ? 1 : 0 }, style]}>
      <Spinner {...rest} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
