import React from "react";
import {
  ImageSourcePropType,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Checkbox from "components/Checkbox";

interface Props {
  title: string;
  mililit: number;
  image: ImageSourcePropType;
  isChoose: boolean;
  onPress: (num: number) => void;
  num: number;
}

const WaterItem = ({
  title,
  mililit,
  image,
  isChoose,
  onPress,
  num,
}: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const onSelect = React.useCallback(() => {
    onPress && onPress(num);
  }, [num, onPress]);
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
      style={[styles.container, { width: (width - 55) / 2 }]}
    >
      <View style={styles.checkbox}>
        <Checkbox checked={isChoose} />
      </View>
      <Image source={image} 
       /* @ts-ignore */
      style={styles.image} />
      <Text category="title4" status="white" center marginTop={20}>
        {title}
      </Text>
      <Text category="subhead" status="grey300" center>
        {mililit}ml
      </Text>
    </TouchableOpacity>
  );
};

export default WaterItem;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 8,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: "text-placeholder-color",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 16,
  },
  checkbox: {
    alignItems: "flex-end",
    width: "100%",
    paddingRight: 8,
  },
  image: {
    width: 80,
    height: 112,
    marginTop: 3,
  },
});
