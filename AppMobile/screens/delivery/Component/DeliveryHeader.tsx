import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";

interface Props {
  iconRight?: string;
  iconLeft?: string;
  title: string;
  shoppingCart?: number;
  bold?: boolean;
}

const DeliveryHeader = memo(
  ({ title, iconRight, iconLeft, shoppingCart, bold }: Props) => {
    const { goBack } = useNavigation();
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    return (
      <Layout
        level={"2"}
        style={[
          styles.header,
          { paddingTop: top, paddingLeft: iconLeft ? 0 : 16 },
        ]}
      >
        <TopNavigation
          appearance={"control"}
          accessoryLeft={() => (
            <>
              {iconLeft ? (
                <NavigationAction icon={iconLeft ? iconLeft : "leftArrow"} />
              ) : (
                <TouchableOpacity onPress={goBack}>
                  <Avatar source={Images.avatar11} size={"32"} />
                </TouchableOpacity>
              )}
            </>
          )}
          accessoryRight={() => (
            <View>
              <NavigationAction icon={iconRight ? iconRight : "shopping"} />
              {shoppingCart ? (
                <Layout style={styles.shoppingCart}>
                  <Text
                    category="caption2"
                    status={"white"}
                    fontFamily={"Overpass-Bold"}
                  >
                    {shoppingCart}
                  </Text>
                </Layout>
              ) : null}
            </View>
          )}
        />
        <Text
          category="title2"
          marginBottom={8}
          marginLeft={iconLeft ? 16 : 0}
          fontFamily={bold ? "Overpass-Bold" : "Overpass-Regular"}
        >
          {title}
        </Text>
      </Layout>
    );
  }
);

export default DeliveryHeader;

const themedStyles = StyleService.create({
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  shoppingCart: {
    position: "absolute",
    borderRadius: 99,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    right: 10,
    top: 12,
  },
});
