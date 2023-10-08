import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Images } from "assets/images";
import AnimatedAppearance from "components/AnimatedAppearance";

const Lectures = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const MAX_WIDTH = 191 * (width / 375);
  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        {DATA.map((item, i) => {
          return (
            <TouchableOpacity key={i} activeOpacity={0.7} onPress={goBack}>
              <Text marginBottom={16} category="title4">
                {item.section}
              </Text>
              <View style={styles.item}>
                <Text category="header" marginRight={16} status={"description"}>
                  {item.id}
                </Text>
                <View>
                  <Text category="title4" marginBottom={8} maxWidth={MAX_WIDTH}>
                    {item.title}
                  </Text>
                  <Text category="caption1" status={"placeholder"}>
                    {item.des}
                  </Text>
                </View>
                {item.sectionDone ? (
                  <Image
                    source={Images.checked}
                    /* @ts-ignore */
                    style={styles.checked}
                  />
                ) : (
                  <Image
                    source={Images.circleSlider}
                    /* @ts-ignore */
                    style={styles.checked}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </AnimatedAppearance>
  );
});

export default Lectures;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "background-basic-color-7",
  },
  checked: {
    position: "absolute",
    right: 12,
    width: 32,
    height: 32,
  },
});
const DATA = [
  {
    id: "01",
    section: "Section 1: Introduction",
    title: "Introduction to this a Motion Design",
    des: "⏰️ 40 mins",
    sectionDone: true,
  },
  {
    id: "02",
    section: "Section 2: The Structure of the Head",
    title: "Introduction to this a Motion Design",
    des: "⏰️ 40 mins remaning",
  },
];
