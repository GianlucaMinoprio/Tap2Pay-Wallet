import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";

interface Props {
  id: number;
  image: ImageSourcePropType;
  title: string;
  calsUnder?: number;
  cals: number;
  recommended?: number;
}
interface ItemProps {
  data: Props;
  onPress?(): void;
}

const ItemMeal = ({ data, onPress }: ItemProps) => {
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, { width: (width - 55) / 2 }]}>
      <Image
        source={data.image}
        /* @ts-ignore */
        style={styles.image}
      />
      <Text category="headline" status="white" children={data.title} />
      <Text
        category="subhead"
        status="grey300"
        marginTop={24}
        marginBottom={8}
        children={`${data.cals} Cals`}
      />
      {data.calsUnder ? (
        <Text
          category="caption1"
          status="placeholder"
          children={`${data.calsUnder} Cals Under`}
          marginBottom={26}
        />
      ) : (
        <Text
          category="caption1"
          status="placeholder"
          children={`${data.recommended} Recommended`}
          marginBottom={26}
        />
      )}
      <Button onPress={onPress} status="primary-blue" children="ADD" />
    </View>
  );
};

export default ItemMeal;

const themedStyles = StyleService.create({
  container: {
    borderWidth: 1,
    borderColor: "background-basic-color-7",
    borderRadius: 8,
    marginRight: 12,
    padding: 16,
  },
  image: {
    marginBottom: 8,
  },
});
