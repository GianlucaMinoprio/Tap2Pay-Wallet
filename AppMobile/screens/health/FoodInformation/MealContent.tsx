import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";

import Text from "components/Text";

interface Props {
  title: string;
  gam: number;
  cals: number;
}
interface MealContentProps {
  title: string;
  data: Props[];
  style: StyleProp<ViewStyle>;
}

const MealContent = ({ title, data, style }: MealContentProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={style}>
      <Text category="title4" status="white">
        {title}
      </Text>
      <View>
        {data.map((item, index) => {
          return (
            <Layout key={index} style={styles.card} level="2">
              <View>
                <Text category="headline" status="white" marginBottom={4}>
                  {item.title}
                </Text>
                <Text
                  category="footnote"
                  status="placeholder"
                >{`${item.cals} CALS`}</Text>
              </View>
              <Text category="headline" status="white">
                {item.gam}g
              </Text>
            </Layout>
          );
        })}
      </View>
    </View>
  );
};

export default MealContent;

const themedStyles = StyleService.create({
  card: {
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 10,
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
    justifyContent: "space-between",
    paddingRight: 16,
    borderColor: "color-basic-1500",
  },
});
