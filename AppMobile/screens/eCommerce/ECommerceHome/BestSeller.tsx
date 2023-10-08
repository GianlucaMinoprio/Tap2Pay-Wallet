import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Images } from "assets/images";

const BestSeller = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const wItem = (width - 48) / 2;

  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text category="title3" status="white">
          BestSeller
        </Text>
        <Text children="View All" status="primary" />
      </View>
      <View style={styles.content}>
        {DATA_Page.map((i, _) => (
          <TouchableOpacity key={_} style={styles.touch} activeOpacity={0.7}>
            <Layout
              style={[styles.item, { width: wItem, height: wItem }]}
              level="2"
            >
              <TouchableOpacity>
                <Icon pack="assets" name="heart" style={styles.icon} />
              </TouchableOpacity>
              <Image
                source={i.image}
                /* @ts-ignore */
                style={styles.img}
              />
            </Layout>
            <Text
              children={i.title}
              status="white"
              marginTop={12}
              category="headline"
            />
            <Text children={i.price} status="snow" category="subhead" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

export default BestSeller;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
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
    image: Images.pizza1,
    title: "Pizza Illustration",
    price: "123ETH",
  },
  {
    id: 1,
    image: Images.donut1,
    title: "Donnut 3D",
    price: "28ETH",
  },
  {
    id: 2,
    image: Images.hotdog1,
    title: "Minimal ART NFT",
    price: "45ETH",
  },
  {
    id: 3,
    image: Images.burger1,
    title: "Minimal ART NFT",
    price: "55ETH",
  },
];
