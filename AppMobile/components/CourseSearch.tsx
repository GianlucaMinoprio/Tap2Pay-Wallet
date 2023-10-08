import React, { memo } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  InputProps,
  Input,
  Icon,
} from "@ui-kitten/components";

export interface MyInputProps extends InputProps {
  style?: ViewStyle;
  _onSearch?(): void;
}

const CourseSearch = memo(({ style, _onSearch, ...rest }: MyInputProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Input
        style={[styles.input, style]}
        clearButtonMode="always"
        placeholder="Search"
        size={"great"}
        status={"great"}
        accessoryRight={() => (
          <TouchableOpacity
            style={styles.btnSearch}
            activeOpacity={0.7}
            onPress={_onSearch}
          >
            <Icon pack="assets" name="search" style={styles.icon} />
          </TouchableOpacity>
        )}
        {...rest}
      />
    </View>
  );
});

export default CourseSearch;

const themedStyles = StyleService.create({
  container: {},
  input: {
    borderRadius: 16,
  },
  btnSearch: {
    borderRadius: 16,
    width: 56,
    height: 56,
    padding: 17,
    backgroundColor: "color-primary-100",
    marginVertical: -12,
    marginHorizontal: -10,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: "color-great-100",
  },
});
