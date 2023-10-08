import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Avatar,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { LinearGradient } from "expo-linear-gradient";

const Menu = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        accessoryLeft={<NavigationAction status="snow" />}
        accessoryRight={
          <Image
            source={Images.logo4}
            /* @ts-ignore */
            style={styles.logo}
          />
        }
      />
      <Content contentContainerStyle={styles.content}>
        {DATA.map((item, i) => {
          return (
            <TouchableOpacity
              key={i + item.title}
              activeOpacity={0.7}
              onPress={() => setSelectedIndex(i)}
              style={[
                styles.item,
                {
                  backgroundColor:
                    i === selectedIndex
                      ? theme["text-primary-color"]
                      : "transparent",
                },
              ]}
            >
              <View style={styles.title}>
                <Layout style={styles.layoutIc}>
                  <Icon
                    pack="assets"
                    name={item.icon}
                    style={{
                      tintColor:
                        i === selectedIndex
                          ? theme["text-primary-color"]
                          : theme["text-white-color"],
                    }}
                  />
                </Layout>
                <Text
                  marginLeft={16}
                  category="headline"
                  status={i === selectedIndex ? "black" : "white"}
                >
                  {item.title}
                </Text>
              </View>
              <Icon
                pack="assets"
                name="arrowRight16"
                style={[
                  styles.iconArr,
                  {
                    tintColor:
                      i === selectedIndex
                        ? theme["text-black-color"]
                        : theme["text-white-color"],
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </Content>
      <LinearGradient
        colors={["rgba(19, 51, 100, 1)", "rgba(81, 145, 240, 1)"]}
        style={[
          styles.linear,
          {
            paddingBottom: 24 + bottom,
          },
        ]}
      >
        <Avatar
          source={DATA_USER.avatar}
          size={"64"}
          /* @ts-ignore */
          style={styles.avatar}
        />
        <View>
          <Text category="title3" marginBottom={8}>
            {DATA_USER.name}
          </Text>
          <Text category="subhead" status={"snow"}>
            Total expense: ${DATA_USER.totalExpense}
          </Text>
        </View>
      </LinearGradient>
    </Container>
  );
});

export default Menu;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginHorizontal: 16,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
    paddingBottom: 12,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  layoutIc: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconArr: {
    width: 12,
    height: 12,
  },
  linear: {
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
  },
  avatar: {
    marginRight: 12,
  },
});
const DATA = [
  { id: 0, title: "Home", icon: "heart" },
  { id: 0, title: "List coin price", icon: "list" },
  { id: 0, title: "Overview", icon: "eye" },
  { id: 0, title: "Wallet", icon: "creditCard" },
  { id: 0, title: "News and Blog", icon: "worldWide" },
  { id: 0, title: "Settings", icon: "settings" },
];
const DATA_USER = {
  id: 0,
  name: "Lee Shnowir",
  totalExpense: 12680.99,
  avatar: Images.avatar11,
};
