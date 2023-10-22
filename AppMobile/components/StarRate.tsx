import React from "react";
import { View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import Text from "components/Text";

interface Props {
  defaultRate: number;
  setDefaultRate: React.Dispatch<React.SetStateAction<number>>;
  reviewer?: number;
  style?: StyleProp<ViewStyle>;
}
const StarRate = ({ defaultRate, setDefaultRate, reviewer, style }: Props) => {
  const theme = useTheme();
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, style]}>
      {maxRating.map((item, _) => {
        return (
          <TouchableOpacity
            key={_}
            style={[styles.button]}
            onPress={() => setDefaultRate(_ + 1)}
            activeOpacity={0.7}
          >
            <Icon
              pack="assets"
              name="star"
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
          </TouchableOpacity>
        );
      })}
      {reviewer ? (
        <Text
          uppercase
          marginLeft={4}
          category="footnote"
          status="snow"
          children={`(${reviewer} reviewer)`}
        />
      ) : null}
    </View>
  );
};

export default StarRate;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
  },
  star: {
    marginRight: 4,
    height: 16,
    width: 16,
  },
  button: {
    backgroundColor: "transparent",
  },
});
