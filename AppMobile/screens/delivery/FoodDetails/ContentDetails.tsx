import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Svg, {
  Circle,
  Defs,
  Rect,
  Stop,
  LinearGradient,
} from "react-native-svg";
import { Images } from "assets/images";
import Animated from "react-native-reanimated";
import AnimatedAppearance from "components/AnimatedAppearance";
import { Animation_Types_Enum } from "constants/Type";

interface ContentDetailsProps {
  activeTab: number;
  onChange(index: number): void;
}

const ContentDetails = memo(({ activeTab, onChange }: ContentDetailsProps) => {
  const { height, width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const TABS = ["Location", "Ingrdients"];
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeTab]
  );
  return (
    <View style={[styles.container, { width: width }]}>
      <View
        style={{
          justifyContent: "space-between",
          height: 140 * (height / 812),
          width: 90 * (width / 375),
        }}
      >
        {TABS.map((item, i) => {
          return (
            <TouchableOpacity onPress={() => changeIndex(i)} key={i}>
              <Text
                status={activeTab !== i ? "grey500" : "basic"}
                style={styles.btnTab}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <Svg height={"188"} width={width.toString()}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop
                offset="0"
                stopColor="rgba(44, 88, 160, 1)"
                stopOpacity="1"
              />
              <Stop
                offset="1"
                stopColor="rgba(81, 145, 240, 1)"
                stopOpacity="1"
              />
            </LinearGradient>
            <LinearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
              <Stop
                offset="0"
                stopColor="rgba(44, 88, 157, 1)"
                stopOpacity="1"
              />
              <Stop
                offset="1"
                stopColor="rgba(44, 88, 157, 1)"
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Circle cx="135" cy="94" r="94" fill="url(#grad1)" opacity="1" />
          <Rect
            x="135"
            y="0"
            width="200"
            height="188"
            fill="url(#grad)"
            opacity="1"
          />
        </Svg>
        <ViewPager
          selectedIndex={activeTab}
          onSelect={onChange}
          swipeEnabled={false}
          shouldLoadComponent={(i) => activeTab === i}
          style={styles.viewPager}
        >
          <Animated.View
            style={{ position: "absolute", right: -32, bottom: 12 }}
          >
            <AnimatedAppearance type={Animation_Types_Enum.SlideInLeft}>
              <Animated.Image
                source={Images.potatoChip}
                style={{
                  width: 337 * (width / 375),
                  height: 461.5 * (height / 812),
                }}
              />
            </AnimatedAppearance>
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 32,
              right: width / 4,
              zIndex: 10,
            }}
          >
            <AnimatedAppearance type={Animation_Types_Enum.SlideInLeft}>
              <Animated.View style={styles.tabIngrdients}>
                <View>
                  <Text>Total Fat</Text>
                  <Text>Cholesterol </Text>
                  <Text>Sodium </Text>
                  <Text>Potassium</Text>
                  <Text>Protein</Text>
                </View>
                <View style={styles.ingrdients}>
                  <Text category="caption1">35g 53%</Text>
                  <Text category="caption1">0mg 0%</Text>
                  <Text category="caption1">8mg 0%</Text>
                  <Text category="caption1">1275mg 36%</Text>
                  <Text category="caption1">7g 14%</Text>
                </View>
              </Animated.View>
            </AnimatedAppearance>
          </Animated.View>
        </ViewPager>
      </View>
    </View>
  );
});

export default ContentDetails;

const themedStyles = StyleService.create({
  container: {
    marginTop: 28 + 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnTab: {
    transform: [{ rotateZ: "90deg" }],
    width: 80,
  },
  viewPager: {
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  ingrdients: {
    justifyContent: "space-between",
    marginLeft: 24,
  },
  tabIngrdients: {
    flexDirection: "row",
  },
});
