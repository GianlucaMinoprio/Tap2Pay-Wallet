import React, { memo } from "react";
import { View, ImageRequireSource } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Animated from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import NavigationAction from "components/NavigationAction";

interface DataShipperProps {
  id: number;
  name: string;
  typeShipper: string;
  rateStar: number;
  avatar: ImageRequireSource;
}
interface FooterTrackingProps {
  shipper: DataShipperProps;
  distance: string;
  time: string;
}

const FooterTracking = memo(
  ({ shipper, distance, time }: FooterTrackingProps) => {
    const { goBack } = useNavigation();
    const { height, width, top, bottom } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const WIDTH = `${width}`;
    const HEIGHT = `${height}`;
    return (
      <Animated.View style={styles.container}>
        <Svg height={HEIGHT} width={WIDTH}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop
                offset="0"
                stopColor="rgba(73, 82, 96, 1)"
                stopOpacity="1"
              />
              <Stop offset="1" stopColor="rgba(53, 63, 73,1)" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Avatar
            source={shipper.avatar}
            /* @ts-ignore */
            style={styles.avatar}
            size={"64"}
          />
          <View style={styles.title}>
            <View>
              <Text category="title3" status={"white"}>
                {shipper.name}
              </Text>
              <Text category="body" status={"placeholder"}>
                {shipper.typeShipper}
              </Text>
            </View>
            <NavigationAction
              icon="phoneCall"
              status="secondary"
              size="medium"
              backgroundColor={theme["text-primary-color"]}
              marginRight={6}
            />
          </View>
          <View style={styles.information}>
            <Text>⭐ {shipper.rateStar}</Text>
            <Text>🛵 {distance}kms</Text>
            <Text>⏰ {time}</Text>
          </View>
          <Rect
            x="0"
            y="0"
            width={WIDTH}
            height={HEIGHT}
            fill="url(#grad)"
            opacity="1"
            rx={24}
          />
        </Svg>
      </Animated.View>
    );
  }
);

export default FooterTracking;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 20,
  },
  avatar: {
    marginTop: -32,
    alignSelf: "center",
    marginBottom: 8,
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
});
