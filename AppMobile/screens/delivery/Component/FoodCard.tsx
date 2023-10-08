import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { LinearGradient } from "expo-linear-gradient";

export interface FoodProps {
  id: number;
  image: ImageRequireSource;
  name: string;
  price: number;
  rate: number;
  distance: number;
  ratio: number;
}
interface FoodCardProps {
  item: FoodProps;
}

const FoodCard = memo(({ item }: FoodCardProps) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const WIDTH_ITEM = 180 * (width / 375);
  const HEIGHT_ITEM = 120 * (height / 812);
  const SIZE_FOOD = 121 * (width / 375);
  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        style={{
          top: -40,
          zIndex: 10,
          position: "absolute",
          left: -12 * item.ratio,
          width: item.ratio * SIZE_FOOD,
          height: item.ratio * SIZE_FOOD,
        }}
      />

      <LinearGradient
        style={{
          width: WIDTH_ITEM,
          height: HEIGHT_ITEM,
          borderRadius: 16,
          justifyContent: "flex-end",
        }}
        colors={["rgba(81, 145, 240, 1)", "rgba(19, 51, 116, 1)"]}
      >
        <View>
          <Layout
            level={"8"}
            style={[styles.freeShip, { marginLeft: WIDTH_ITEM / 2.5 }]}
          >
            <View style={styles.icon}>
              <Icon pack="assets" name="heart" style={styles.iconHeart} />
            </View>
            <Text category="subhead" center>
              Freeship
            </Text>
          </Layout>
        </View>
      </LinearGradient>
      <Text marginVertical={8} category="body">
        {item.name}
      </Text>
      <Text category="title3" status={"primary"}>
        ${item.price}
      </Text>
      <Text category="subhead" status={"grey500"}>
        ⭐️ {item.rate}/5{"    "}🛵️ {item.distance}kms
      </Text>
    </View>
  );
});

export default FoodCard;

const themedStyles = StyleService.create({
  container: {
    marginRight: 24,
    marginTop: 52,
  },
  freeShip: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF0000",
  },
  iconHeart: {
    tintColor: "#FF0000",
    width: 13.71,
    height: 13.71,
  },
  icon: {
    backgroundColor: "text-white-color",
    borderRadius: 99,
    padding: 5.14,
    marginRight: 8,
  },
});
