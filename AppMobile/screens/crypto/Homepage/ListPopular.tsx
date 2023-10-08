import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import { Images } from "assets/images";
import { Crypto_Types_Enum } from "constants/Type";
import { LinearGradient } from "expo-linear-gradient";

const ListPopular = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text category="title2" marginLeft={24}>
          Popular
        </Text>
        <TouchableOpacity style={styles.btnAll}>
          <Text category="subhead" marginRight={8} status={"primary"}>
            See all
          </Text>
          <Icon pack="assets" name="rightArrow" style={styles.iconArr} />
        </TouchableOpacity>
      </View>
      <Content horizontal contentContainerStyle={styles.content}>
        {DATA.map((item, i) => {
          let grow = item.status === "grow";
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              style={[
                styles.item,
                {
                  borderBottomColor: grow ? "#4BFF47" : "#FF4747",
                  borderStartColor: grow ? "#4BFF47" : "#FF4747",
                  borderEndColor: grow ? "#4BFF47" : "#FF4747",
                },
              ]}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.22)", "rgba(255, 255, 255, 0)"]}
                style={[
                  styles.linear,
                  {
                    width: 214 * (width / 375),
                  },
                ]}
              >
                <Layout style={styles.iconLogo}>
                  <Icon pack="assets" name={item.icon} style={{}} />
                </Layout>
                <View style={styles.title}>
                  <Text uppercase category="title4">
                    {item.title}
                  </Text>
                  <Text status={"placeholder"} marginRight={8}>
                    /USD
                  </Text>
                  <Icon
                    pack="assets"
                    name={item.status}
                    style={styles.iconGrow}
                  />
                </View>
                <Text category="headline" marginBottom={3} marginLeft={16}>
                  ${item.coin}
                </Text>
                <Text
                  status={item.status === "grow" ? "green" : "red"}
                  marginLeft={16}
                  marginBottom={24}
                  children={item.percent}
                />
                <Image
                  source={Images.chart}
                  style={[
                    /* @ts-ignore */
                    styles.chart,
                    {
                      tintColor: item.status === "grow" ? "#29FF24" : "#FF4747",
                    },
                  ]}
                />
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </Content>
    </View>
  );
});

export default ListPopular;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginBottom: 32,
    marginTop: -24,
  },
  content: {
    marginLeft: 24,
    paddingRight: 32,
  },
  item: {
    borderWidth: 0.5,
    borderTopColor: "#f7f7f7",
    borderRadius: 18,
    marginRight: 24,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 16,
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  btnAll: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 24,
  },
  iconArr: {
    width: 12,
    height: 9,
    tintColor: "text-primary-color",
  },
  linear: {
    borderRadius: 12,
    paddingTop: 16,
  },
  iconLogo: {
    width: 40,
    height: 40,
    marginBottom: 8,
    marginLeft: 16,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGrow: {
    width: 9.2,
    alignSelf: "center",
  },
  chart: {
    width: "100%",
  },
});
const DATA = [
  {
    id: 0,
    title: "ETHEREUM",
    icon: "eth",
    coin: 0.0007247,
    percent: "+11.39%",
    status: Crypto_Types_Enum.Grow,
  },
  {
    id: 1,
    title: "Bitcoin",
    icon: "bitcoin",
    coin: 0.03223,
    percent: "+2.39%",
    status: Crypto_Types_Enum.Down,
  },
  {
    id: 2,
    title: "Ripple",
    icon: "xrp",
    coin: 0.7247,
    percent: "-1.9%",
    status: Crypto_Types_Enum.Down,
  },
  {
    id: 3,
    title: "Tether",
    icon: "tether",
    coin: 0.247,
    percent: "+1.9%",
    status: Crypto_Types_Enum.Grow,
  },
  {
    id: 4,
    title: "Littecoin",
    icon: "littecoin",
    coin: 0.247,
    percent: "-2.932%",
    status: Crypto_Types_Enum.Down,
  },
];
