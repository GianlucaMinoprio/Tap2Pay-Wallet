import React, { memo } from "react";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";

interface Props {
  selected: boolean;
}

const SelectBox = memo(({ selected }: Props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      style={[
        styles.checker,
        {
          borderColor: selected
            ? theme["text-primary-color"]
            : theme["color-emerald-100"],
        },
      ]}
    >
      <Layout
        level={"4"}
        style={[
          styles.dot,
          {
            backgroundColor: selected
              ? theme["text-primary-color"]
              : "transparent",
          },
        ]}
      />
    </Layout>
  );
});

export default SelectBox;

const themedStyles = StyleService.create({
  checker: {
    borderRadius: 99,
    width: 24,
    height: 24,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 99,
  },
});
