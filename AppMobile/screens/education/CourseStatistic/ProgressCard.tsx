import React, { memo } from "react";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import CircleSlider from "components/CircleSlider";

interface Props {
  title: string;
  progress: number;
  completed: number;
  uncompleted: number;
}

const ProgressCard = memo(
  ({ title, progress, completed, uncompleted }: Props) => {
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    return (
      <LinearGradient
        colors={["rgba(40, 69, 169, 1)", "rgba(5, 30, 117, 1)"]}
        style={{
          width: 327 * (width / 375),
          height: 357 * (height / 812),
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Svg style={{ position: "absolute", top: -155, left: -160 }}>
          <Circle
            cx={300 / 2}
            cy={300 / 2}
            r={(300 * Math.PI - 99) / (2 * Math.PI)}
            stroke={"rgba(255, 255, 255, 0.04)"}
            strokeWidth={80}
          />
        </Svg>
        <Svg style={{ position: "absolute", bottom: -200, right: -190 }}>
          <Circle
            cx={300 / 2}
            cy={300 / 2}
            r={(300 * Math.PI - 260) / (2 * Math.PI)}
            stroke={"rgba(255, 255, 255, 0.03)"}
            strokeWidth={progress}
          />
        </Svg>
        <Text category="title3" center marginBottom={16} marginTop={24}>
          {title}
        </Text>
        <CircleSlider value={80} d={140} />
        <LinearGradient
          colors={["rgba(0, 133, 214, 1)", "rgba(65, 179, 250, 1)"]}
          style={styles.footerCard}
        >
          <Text category="headline" marginRight={5}>
            {completed}
          </Text>
          <Text category="subhead" opacity={0.5}>
            Completed
          </Text>
          <Layout style={styles.line} />
          <Text category="headline">{uncompleted}</Text>
          <Text category="subhead" opacity={0.5}>
            Uncompleted
          </Text>
        </LinearGradient>
      </LinearGradient>
    );
  }
);

export default ProgressCard;

const themedStyles = StyleService.create({
  line: {
    width: 1,
    height: "100%",
    marginHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  footerCard: {
    flexDirection: "row",
    paddingHorizontal: 23,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },
});
