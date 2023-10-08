import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CardBalance from "./CardBalance";
import Line from "components/Line";
import TabBar from "../../../components/TabBarProfile";
import Page05 from "./Page05";
import useLayout from "hooks/useLayout";

const Profile05 = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom, height } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [dataBalance, setDataBalance] = React.useState(DATA);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        title="Shop Profile"
        accessoryRight={
          <View style={{ flexDirection: "row" }}>
            <NavigationAction marginRight={-8} />
            <NavigationAction icon="shopping" />
          </View>
        }
      />
      <Content style={{ paddingTop: 6 }}>
        <CardBalance item={dataBalance} onPress={goBack} />
        <View style={styles.cardHis}>
          <TouchableOpacity style={styles.flexRow} activeOpacity={0.7}>
            <Text category="title3" children="Order History" status="white" />
            <Icon pack="assets" name="rightArrow" style={styles.iconArrow} />
          </TouchableOpacity>
          <Line
            backgroundColor={theme["color-basic-1300"]}
            marginTop={16}
            marginBottom={26}
          />
          <View style={styles.item}>
            {DATA_item.map((i, _) => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                activeOpacity={0.64}
                key={_}
              >
                <Icon
                  pack="assets"
                  name={i.icon}
                  style={{ tintColor: theme["text-white-color"] }}
                />
                <Text
                  children={i.title}
                  status="snow"
                  category="caption1"
                  marginTop={14}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Layout
          level="2"
          style={{ borderRadius: 24, paddingBottom: bottom + 40 }}
        >
          <TabBar
            tabs={["Wishlist", "Recent View"]}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            style={styles.tabBar}
          />
          <ViewPager
            shouldLoadComponent={(index) => index === activeIndex}
            selectedIndex={activeIndex}
            onSelect={setActiveIndex}
          >
            <Page05 />
            <Page05 />
          </ViewPager>
        </Layout>
      </Content>
    </Container>
  );
});

export default Profile05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  cardHis: {
    backgroundColor: "background-basic-color-2",
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  tabBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconArrow: {
    tintColor: "text-snow-color",
    width: 16,
    height: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
const DATA = {
  id: 0,
  balance: "$12,680.99",
  name: "Myrtle Burns",
  avatar: Images.avatar0,
};
const DATA_item = [
  {
    id: 0,
    icon: "creditCard",
    title: "Confirm",
  },
  {
    id: 1,
    icon: "insurance",
    title: "Waiting",
  },
  {
    id: 2,
    icon: "truck",
    title: "Delivery",
  },
  {
    id: 3,
    icon: "star",
    title: "Rating",
  },
];
