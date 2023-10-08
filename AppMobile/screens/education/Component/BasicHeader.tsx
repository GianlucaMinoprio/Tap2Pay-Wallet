import React, { memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  TopNavigationProps,
} from "@ui-kitten/components";
import Text from "components/Text";
import NavigationAction from "components/NavigationAction";
import { useNavigation } from "@react-navigation/native";

interface Props {
  icon: string;
  _onPress?(): void;
}
interface BasicHeaderProps extends TopNavigationProps {
  style?: StyleProp<ViewStyle>;
  iconLeft: Props;
  iconRight: Props;
  title?: string;
  notification?: number;
}

const BasicHeader = memo(
  ({
    style,
    iconLeft,
    iconRight,
    title,
    notification,
    ...rest
  }: BasicHeaderProps) => {
    const styles = useStyleSheet(themedStyles);
    const { goBack } = useNavigation();
    return (
      <TopNavigation
        style={style}
        title={title}
        accessoryLeft={
          <NavigationAction
            icon={iconLeft.icon}
            onPress={iconLeft._onPress ? iconLeft._onPress : goBack}
          />
        }
        accessoryRight={
          <View>
            {notification ? (
              <Layout style={styles.notification}>
                <Text category="caption2">{notification}</Text>
              </Layout>
            ) : null}
            <NavigationAction
              icon={iconRight.icon}
              onPress={iconRight._onPress ? iconRight._onPress : goBack}
            />
          </View>
        }
        {...rest}
      />
    );
  }
);

export default BasicHeader;

const themedStyles = StyleService.create({
  notification: {
    position: "absolute",
    right: 14,
    top: 8,
    borderRadius: 99,
    backgroundColor: "red",
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
