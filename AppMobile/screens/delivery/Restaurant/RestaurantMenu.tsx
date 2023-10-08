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
import { LinearGradient } from "expo-linear-gradient";

interface RestaurantMenuProps {
  id: number;
  name: string;
  image: any[];
}
interface ItemProps {
  item: RestaurantMenuProps;
}

const RestaurantMenu = memo(({ item }: ItemProps) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const _onMore = () => {};
  const SIZE_SMALL_IMG = 125 * (width / 375);
  const WIDTH_IMG = 154 * (width / 375);
  const HEIGHT_IMG = 266 * (width / 375);
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.linear}
        colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.07)"]}
      >
        <View>
          <View style={styles.title}>
            <Text category="title3">{item.name}</Text>
            <Layout style={styles.btnAll} level={"7"}>
              <Text category="caption1" status={"snow"} marginRight={4}>
                See all
              </Text>
              <Icon pack="assets" name="rightArrow" style={styles.icon} />
            </Layout>
          </View>
          <View style={styles.imageView}>
            <Image
              source={item.image[0]}
              style={[
                /* @ts-ignore */
                styles.img,
                {
                  width: WIDTH_IMG,
                  height: HEIGHT_IMG,
                },
              ]}
            />
            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <Image
                source={item.image[1]}
                /* @ts-ignore */
                style={[styles.img]}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={_onMore}>
                <View
                  style={[
                    styles.more,
                    {
                      width: SIZE_SMALL_IMG,
                      height: SIZE_SMALL_IMG,
                    },
                  ]}
                >
                  <Text center>More</Text>
                </View>
                <Image
                  source={item.image[2]}
                  /* @ts-ignore */
                  style={[styles.img]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});

export default RestaurantMenu;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  linear: {
    borderRadius: 16,
    padding: 16,
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnAll: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: "#CBD2D9",
  },
  img: {
    borderRadius: 16,
  },
  more: {
    backgroundColor: "rgba(0, 0, 0, 0.86)",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderRadius: 16,
    justifyContent: "center",
  },
});
