import React from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";

interface Props {
  step: number;
  timeStep: Array<string>;
}

const ProgressSchedule = ({ step, timeStep }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const HEIGHT_LINE_ACTIVE = 163 * (height / 812);
  const Step = React.useCallback(
    ({
      active,
      title,
      time,
      line,
      des,
    }: {
      start?: boolean;
      active?: boolean;
      title: string;
      time: string;
      line: boolean;
      des: string;
    }) => {
      return (
        <View style={styles.item}>
          <View>
            <View
              style={[
                styles.circle,
                {
                  borderColor: active
                    ? theme["color-primary-100"]
                    : theme["background-basic-color-2"],
                },
              ]}
            />
            {line ? (
              <Layout
                level="2"
                style={[
                  styles.line,
                  {
                    height: HEIGHT_LINE_ACTIVE,
                    backgroundColor: active
                      ? theme["color-primary-100"]
                      : theme["background-basic-color-2"],
                  },
                ]}
              />
            ) : null}
          </View>
          <View>
            <Text category="title4" marginBottom={8}>
              {time}
            </Text>
            <Layout
              level={"2"}
              style={[styles.details, { width: 302 * (width / 375) }]}
            >
              <Text category="title4">{title}</Text>
              <Text category="caption1" opacity={0.5} marginRight={24}>
                {des}
              </Text>
              <View style={styles.footerItem}>
                <Text category="caption2">🖥️ 50+ videos</Text>
                <Text category="caption2">⏰️ 12 hours</Text>
                <Text category="caption2">👨🏻‍‍️ 509+ students</Text>
              </View>
            </Layout>
          </View>
        </View>
      );
    },
    []
  );
  return (
    <View style={styles.container}>
      <Step
        line={true}
        active={step >= 1}
        time={timeStep[0]}
        title="Design System"
        des="When an unknown printer took a galley of type and scrambled it to make a t specimen book"
      />
      <Step
        line={true}
        active={step >= 2}
        time={timeStep[1]}
        title="Color Theme"
        des="When an unknown printer took a galley of type and scrambled it to make a t specimen book"
      />
      <Step
        line={true}
        active={step >= 3}
        time={timeStep[2]}
        title="Component"
        des="When an unknown printer took a galley of type and scrambled it to make a t specimen book"
      />
      <Step
        line={true}
        active={step >= 4}
        time={timeStep[3]}
        title="Color Theme"
        des="When an unknown printer took a galley of type and scrambled it to make a t specimen book"
      />
    </View>
  );
};

export default ProgressSchedule;

const themedStyles = StyleService.create({
  container: {
    marginLeft: 24,
  },
  line: {
    width: 2,
    alignSelf: "center",
    marginRight: 9,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  footerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 32,
    marginTop: 10,
  },
  circle: {
    width: 13,
    height: 13,
    borderRadius: 99,
    borderWidth: 3,
    marginRight: 9,
  },
  details: {
    borderRadius: 12,
    padding: 16,
  },
});
