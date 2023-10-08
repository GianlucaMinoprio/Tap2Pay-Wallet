import React, { memo } from "react";
import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Radio,
  Layout,
  CheckBox,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import Checkbox from "components/Checkbox";

interface Props {
  step: number;
  timeStep: Array<string>;
}

const OrderStep = ({ step, timeStep }: Props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  
  const Step = React.useCallback(
    ({
      active,
      title,
      time,
      line,
    }: {
      start?: boolean;
      active?: boolean;
      title: string;
      time: string;
      line: boolean;
    }) => {
      return (
        <View style={styles.item}>
          <View>
            <Checkbox checked={active} style={{ borderRadius: 99 }} />
            <Layout style={{}}/>
            {line ? <Layout level="2" style={styles.line} /> : null}
          </View>
          <View>
            <Text
              category="body"
              marginLeft={14}
              marginBottom={8}
              marginTop={-2}
            >
              {title}
            </Text>
            <Text marginLeft={14} category="subhead" status="grey500">
              {time}
            </Text>
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
        active={step >= 4}
        time={timeStep[0]}
        title="Shipper is going"
      />
      <Step
        line={true}
        active={step >= 3}
        time={timeStep[1]}
        title="Delivered to the shipper"
      />
      <Step
        line={true}
        active={step >= 2}
        time={timeStep[2]}
        title="Package have left the warehouse"
      />
      <Step
        line={false}
        active={step >= 1}
        time={timeStep[3]}
        title="Item is being packed"
      />
    </View>
  );
};

export default OrderStep;

const themedStyles = StyleService.create({
  container: {
    marginLeft: 50,
  },
  line: {
    height: 60,
    width: 2,
    alignSelf: "center",
    marginVertical: 3,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
