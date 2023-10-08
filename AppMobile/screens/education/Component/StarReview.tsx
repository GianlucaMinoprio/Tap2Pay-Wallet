import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import Text from "components/Text";

interface Props {
  defaultRate: number;
  style?: StyleProp<ViewStyle>;
}
const StarReview = ({ defaultRate, style }: Props) => {
  const theme = useTheme();
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, style]}>
      <Text category="caption1" marginRight={1}>
        {defaultRate}/5
      </Text>
      {maxRating.map((item, _) => {
        return (
          <View key={_} style={[styles.button]}>
            <Icon
              pack="assets"
              name="star1"
              style={[
                styles.star,
                {
                  tintColor:
                    item < defaultRate + 1
                      ? theme["text-primary-color"]
                      : theme["text-placeholder-color"],
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default StarReview;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  star: {
    height: 12,
    width: 12,
    marginLeft: 3,
  },
  button: {
    backgroundColor: "transparent",
  },
});
