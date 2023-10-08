import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Images } from "assets/images";

interface Props {
  id: number;
  image: ImageSourcePropType;
  title: string;
  isPass: boolean;
}
interface ItemProps {
  item: Props;
}

const ItemAchievements = ({ item }: ItemProps) => {
  const { image, title, isPass } = item;
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={[
        styles.container,
        { width: (width - 136) / 3, opacity: isPass ? 1 : 0.5 },
      ]}
    >
      <Image source={image} />
      <View style={styles.title}>
        {isPass ? <Image source={Images.isPass} /> : null}
        <Text children={title} category="body" status="white" marginLeft={4} />
      </View>
      <Text status="placeholder" category="subhead" marginTop={-4}>
        reached
      </Text>
    </View>
  );
};

export default ItemAchievements;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    marginRight: 36,
    marginBottom: 26,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});
