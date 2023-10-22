import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

interface LinearBottomProps {
  leftButton: { icon: string; onPress?(): void };
  rightButton: { icon: string; onPress?(): void };
  onPressHome?(): void;
}

const LinearBottom = memo(
  ({ leftButton, rightButton, onPressHome }: LinearBottomProps) => {
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    return (
      <View style={[styles.btnBottom, { bottom: bottom + 8 }]}>
        <LinearGradient
          style={styles.linear}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.8, y: 0.1 }}
          colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
        >
          <BlurView tint="dark" style={styles.blurView} intensity={50}>
            <TouchableOpacity activeOpacity={0.7} onPress={leftButton.onPress}>
              <Icon
                pack="assets"
                name={leftButton.icon ? leftButton.icon : "house"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Button
              size={"48"}
              style={styles.btnUnion}
              onPress={onPressHome}
              accessoryRight={<Icon pack="assets" name="union" />}
            />
            <TouchableOpacity onPress={rightButton.onPress} activeOpacity={0.7}>
              <Icon
                pack="assets"
                name={rightButton.icon ? rightButton.icon : "user"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </BlurView>
        </LinearGradient>
      </View>
    );
  }
);

export default LinearBottom;

const themedStyles = StyleService.create({
  btnBottom: {
    marginHorizontal: 80,
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: 99,
  },
  blurView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "text-white-color",
  },
  linear: {
    borderRadius: 40,

    alignItems: "center",
  },
  btnUnion: {
    borderRadius: 99,
  },
});
