import React, { memo } from "react";
import { View, ImageBackground } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { LinearGradient } from "expo-linear-gradient";
import LitterNew from "../Component/LitterNew";
import ReadMore from "components/ReadMore";
import BottomTab from "../Component/BottomTab";

const NewDetails = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.ggCourse01}
        style={{
          width: width,
          height: 295 * (height / 812),
          position: "absolute",
        }}
      />
      <TopNavigation
        appearance={"control"}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={<NavigationAction icon="heart" />}
      />
      <Content contentContainerStyle={{ paddingTop: 115 * (height / 812) }}>
        <LinearGradient
          style={styles.linearCard}
          colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.27)"]}
        >
          <Text category="title3">
            Participate in the Corra Finance Airdrop on CoinMarketCap
          </Text>
          <Layout style={styles.line} />
          <View style={styles.footer}>
            <View style={styles.titleFooter}>
              <Layout style={styles.icon}>
                <Icon pack="assets" name={"eth"} style={{}} />
              </Layout>
              <Text category="headline">Ethereum</Text>
            </View>
            <Text category="headline" status={"grey500"}>
              3 days ago
            </Text>
          </View>
        </LinearGradient>
        <Text
          category="title4"
          marginBottom={4}
          marginLeft={24}
          fontFamily="Overpass-Bold"
        >
          About
        </Text>
        <ReadMore
          children={DESCRIPTION}
          marginHorizontal={24}
          marginBottom={32}
        />
        <Text
          category="title4"
          marginLeft={24}
          marginBottom={16}
          fontFamily="Overpass-Bold"
        >
          Other News
        </Text>
        {DATA.map((item, i) => {
          return <LitterNew item={item} key={i} />;
        })}
      </Content>
      <BottomTab />
    </Container>
  );
});

export default NewDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  line: {
    height: 1,
    marginBottom: 10,
    marginTop: 32,
    backgroundColor: "#CED0DE",
    opacity: 0.5,
  },
  linearCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 20,
    marginBottom: 32,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.8 }],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
});
const DESCRIPTION = `Wales typed the words "Hello, World!" after launching Wikipedia on January 15, 2001, and the moment has been immortalized in an NFT that sold for $750,000 at Christie's on Wednesday wales the auction house said in a statement.
An NFT is a piece of digital content linked to the blockchain, the digital database underpinning cryptocurrencies such as bitcoin and ethereum.
They transform digital works of art and other collectibles into one-of-a-kind, verifiable assets that are easy to trade on the blockchain, and have seen a huge spike of interest in the art world.`;
const DATA = [
  {
    id: 0,
    title: "The raised part of the edge on both sides of a  part",
    date: "3 days ago",
    image: Images.collection3,
  },
  {
    id: 1,
    title: "The raised part of the edge on both sides of a  part",
    date: "3 days ago",
    image: Images.collection2,
  },
  {
    id: 2,
    title: "The raised part of the edge on both sides of a  part",
    date: "3 days ago",
    image: Images.collection1,
  },
];
