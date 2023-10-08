import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";


interface RestaurantProps {
  id: number;
  name: string;
  location: string;
  far: number;
  rate: number;
  image: ImageRequireSource;
  menu: string[];
}
interface DataProps {
  data: RestaurantProps[];
}

const Restaurant = memo(({ data }: DataProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const HEIGHT_ITEM = 241 * (height / 812);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text category="title3" marginLeft={24}>
          Restaurant
        </Text>
        <Layout level={"7"} style={styles.btnAll}>
          <Text category="caption1" status={"snow"}>
            View all
          </Text>
        </Layout>
      </View>
      <View style={styles.content}>
        {data.map((item, i) => {
          return (
            <View key={i} style={styles.item}>
              <Image
                source={item.image}
                style={{
                  width: width - 48,
                  height: HEIGHT_ITEM,
                  borderRadius: 24,
                }}
              />
              <View style={styles.menu}>
                {item.menu.map((item, i) => {
                  return (
                    <Layout style={styles.itemMenu} level={"7"} key={i}>
                      <Text category="subhead" status={"placeholder"}>
                        {item}
                      </Text>
                    </Layout>
                  );
                })}
              </View>
              <Text category="title3" status={"primary"} marginBottom={8}>
                {item.name}
              </Text>
              <View style={styles.location}>
                <Icon pack="assets" name="worldWide" style={styles.iconWW} />
                <Text category="body">{item.location}</Text>
              </View>
              <Text category="subhead">
                🛵️ {item.far}kms{"     "}⭐️ {item.rate}/5
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
});

export default Restaurant;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 24,
  },
  item: {
    marginBottom: 16,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  btnAll: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 32,
    marginRight: 24,
  },
  menu: {
    flexDirection: "row",
    marginVertical: 16,
  },
  itemMenu: {
    marginRight: 12,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  iconWW: {
    width: 16,
    height: 16,
    tintColor: "text-white-color",
    marginRight: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
