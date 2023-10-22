import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import HideWithKeyboard from "./HideWithKeyboard";
import Text, { MyTextProps } from "./Text";

interface ButtonBottomProps extends ButtonProps {
  children?: string;
  level?: "1" | "2" | "3" | "4";
  textProps?: MyTextProps;
}

const ButtonBottom = ({
  level = "1",
  textProps,
  children,
  ...props
}: ButtonBottomProps) => {
  const { bottom } = useLayout();

  const theme = useTheme();
  return (
    <HideWithKeyboard
      style={[
        styles.container,
        {
          backgroundColor: theme[`background-basic-color-${level}`],
          paddingBottom: bottom + 16,
        },
      ]}
    >
      <Button activeOpacity={0.7} {...props}>
        <Text {...textProps} children={children} />
      </Button>
    </HideWithKeyboard>
  );
};

export default ButtonBottom;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
  },
});
