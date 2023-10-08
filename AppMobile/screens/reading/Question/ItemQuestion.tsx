import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  isChoose: boolean;
  onPress: (num: number) => void;
  num: number;
  minutes: number;
  numberBookPerWeek: number;
}
const ItemQuestion = ({
  isChoose,
  onPress,
  num,
  minutes,
  numberBookPerWeek,
}: Props) => {
  const onSelect = React.useCallback(() => {
    onPress && onPress(num);
  }, [num, onPress]);
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity onPress={onSelect}>
      <Layout
        level={isChoose ? "2" : "1"}
        style={[
          styles.container,
          { borderColor: theme["background-basic-color-2"] },
        ]}
      >
        <View style={styles.clock}>
          <Icon name={"wallClock"} pack="assets" style={styles.icon} />
        </View>
        <View>
          <Text
            children={`${minutes} minutes`}
            status="snow"
            category="headline"
            marginBottom={4}
          />
          <Text
            children={`${numberBookPerWeek} book a week`}
            status="placeholder"
            category="caption1"
          />
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

export default ItemQuestion;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "text-snow-color",
  },
  clock: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 16,
  },
});
