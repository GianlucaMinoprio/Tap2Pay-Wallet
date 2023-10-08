import React, { memo } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  ImageRequireSource,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { LinearGradient } from "expo-linear-gradient";

export interface NewProps {
  id: number;
  title: string;
  date: string;
  coin: string;
  icon: string;
  image: ImageRequireSource;
}
export interface NewItemItemProps {
  item: NewProps;
  onPress?(): void;
}

const NewItem = memo(({ item, onPress }: NewItemItemProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const WIDTH_ITEM = 267 * (width / 375);
  const HEIGHT_ITEM = 190 * (height / 812);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ width: WIDTH_ITEM, marginRight: 24 }}
    >
      <ImageBackground
        source={item.image}
        style={{
          width: WIDTH_ITEM,
          height: HEIGHT_ITEM,
          padding: 10,
          marginBottom: 16,
        }}
        /* @ts-ignore */
        imageStyle={styles.imgStyle}
      >
        <LinearGradient
          style={{
            borderRadius: 26,
            flexDirection: "row",
            alignItems: "center",
            width: 128 * (width / 375),
          }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.8, y: 0.1 }}
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.17)"]}
        >
          <Layout style={styles.icon}>
            <Icon pack="assets" name={item.icon} style={{}} />
          </Layout>
          <Text category="subhead" fontFamily="Overpass-Bold">
            {item.coin}
          </Text>
        </LinearGradient>
      </ImageBackground>
      <Text category="headline">{item.title}</Text>
      <Icon
        pack="assets"
        name="time"
        style={{ tintColor: theme["text-placeholder-color"] }}
      />
      <Text category="subhead" status={"placeholder"}>
        {item.date}
      </Text>
    </TouchableOpacity>
  );
});

export default NewItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  imgStyle: { borderRadius: 16 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.7 }],
    margin: 6,
  },
});
