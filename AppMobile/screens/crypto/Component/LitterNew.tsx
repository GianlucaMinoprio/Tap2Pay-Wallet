import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  id: number;
  title: string;
  date: string;
  image: ImageRequireSource;
}
interface ItemProps {
  item: Props;
}

const LitterNew = memo(({ item }: ItemProps) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const SIZE = 76 * (width / 375);
  return (
    <View style={styles.item}>
      <Image
        source={item.image}
        /* @ts-ignore */
        style={[styles.image, { width: SIZE, height: SIZE }]}
      />
      <View>
        <Text
          category="headline"
          marginBottom={8}
          maxWidth={235 * (width / 375)}
        >
          {item.title}
        </Text>
        <View style={styles.timer}>
          <Icon pack="assets" name="time" style={styles.icTime} />
          <Text category="subhead" status={"placeholder"}>
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default LitterNew;

const themedStyles = StyleService.create({
  item: {
    flexDirection: "row",
    marginBottom: 16,
    marginHorizontal: 24,
  },
  icTime: {
    width: 20,
    height: 20,
    tintColor: "text-placeholder-color",
  },
  timer: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 16,
    marginRight: 16,
  },
});
