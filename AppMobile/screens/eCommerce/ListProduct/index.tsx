import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Header from "./Header";
import { Images } from "assets/images";
import { RefreshControl } from "react-native-web-refresh-control";

const ListProduct = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <Header />

      <Content
        contentContainerStyle={{ paddingBottom: bottom + 40 }}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Image
          source={Images.re04}
          style={{ width: width, height: width / 2.59, marginBottom: 4 }}
        />
        {data.map((item, index) => {
          return (
            <TouchableOpacity style={styles.item} key={index}>
              <Layout
                level="2"
                style={[
                  styles.layout,
                  { width: width / 3.84, height: width / 3.84 },
                ]}
              >
                <Image
                  source={Images.burger}
                  /* @ts-ignore */
                  style={styles.burger}
                />
              </Layout>
              <View>
                <Text
                  children={item.title}
                  status="white"
                  category="title4"
                  marginBottom={12}
                  marginLeft={16}
                />
                <Text
                  children={item.price}
                  status="primary"
                  category="subhead"
                  marginLeft={16}
                />
                <NavigationAction icon="heart" />
              </View>
            </TouchableOpacity>
          );
        })}
      </Content>
    </Container>
  );
});

export default ListProduct;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  tabBar: {
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 14,
  },
  layout: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  burger: {
    width: 64,
    height: 51,
  },
});
const data = [
  {
    id: 0,
    title: "Minimal ART NFT",
    price: "123ETH",
  },
  {
    id: 1,
    title: "Minimal ART NFT",
    price: "123ETH",
  },
  {
    id: 2,
    title: "Minimal ART NFT",
    price: "123ETH",
  },
  {
    id: 3,
    title: "Minimal ART NFT",
    price: "123ETH",
  },
  {
    id: 4,
    title: "Minimal ART NFT",
    price: "123ETH",
  },
];
