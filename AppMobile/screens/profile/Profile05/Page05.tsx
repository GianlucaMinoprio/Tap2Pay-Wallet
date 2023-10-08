import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";

const Page05 = () => {
  const { width } = useLayout();
  const wItem = (width - 48) / 2;
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      {DATA_Page.map((i, _) => (
        <TouchableOpacity key={_} style={styles.touch} activeOpacity={0.7}>
          <Layout style={[styles.item, { width: wItem, height: wItem }]}>
            <TouchableOpacity>
              <Icon pack="assets" name="heart" style={styles.icon} />
            </TouchableOpacity>
            <Image
              source={i.image}
              /* @ts-ignore */
              style={styles.img}
            />
          </Layout>
          <Text children={i.title} marginTop={12} />
          <Text children={i.price} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Page05;

const themedStyles = StyleService.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    flex: 1,
    marginTop: 16,
  },
  touch: {
    marginBottom: 24,
  },
  img: {
    alignSelf: "center",
    marginVertical: 40,
  },
  icon: {
    tintColor: "text-white-color",
    right: 8,
    top: 10,
    position: "absolute",
  },
  item: {
    borderRadius: 8,
  },
});
const DATA_Page = [
  {
    id: 0,
    image: Images.burger,
    title: "Hambergur ART NFT",
    price: "123ETH",
  },
  {
    id: 1,
    image: Images.cakeV2,
    title: "Cake ART NFT",
    price: "28ETH",
  },
  {
    id: 2,
    image: Images.chocolate,
    title: "Chocolate ART",
    price: "45ETH",
  },
  {
    id: 3,
    image: Images.popcorn,
    title: "Popcorn ART",
    price: "55ETH",
  },
];
