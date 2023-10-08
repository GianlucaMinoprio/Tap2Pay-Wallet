import React, { memo } from "react";
import { View, Image, FlatList } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import BasicHeader from "screens/education/Component/BasicHeader";
import { Images } from "assets/images";
import Market from "./Market";
import BottomTab from "../Component/BottomTab";
import keyExtractor from "utils/keyExtractor";
import ListPopular from "./ListPopular";

const Homepage = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const SIZE_PIG = 195.97 * (width / 375);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <Image
        source={Images.bgCrypto}
        /* @ts-ignore */
        style={[styles.bg, { width: width, height: height / 2 }]}
      />
      <BasicHeader
        style={[{ marginTop: top }]}
        appearance={"control"}
        iconLeft={{ icon: "drawMenu" }}
        iconRight={{ icon: "user" }}
        title="Home"
      />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        renderItem={() => (
          <>
            <View style={styles.title}>
              <Image
                source={Images.safeMoney}
                resizeMode="center"
                style={{
                  width: SIZE_PIG,
                  height: SIZE_PIG,
                  position: "absolute",
                  right: -8,
                  top: -16,
                  transform: [{ rotateZ: "3deg" }],
                }}
              />

              <View>
                <Text
                  marginLeft={24}
                  marginTop={16}
                  category="title3"
                  marginRight={120}
                >
                  Connect and Sell extraordinary NFTs
                </Text>
                <Button
                  children={() => (
                    <Text category="subhead" status={"black"}>
                      Learn more
                    </Text>
                  )}
                  style={styles.learnMore}
                  size={"44"}
                />
              </View>
            </View>
            <Layout style={styles.topContent} />
            <Layout>
              <ListPopular />
              <Market />
            </Layout>
          </>
        )}
      />
      <BottomTab />
    </Container>
  );
});

export default Homepage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    marginTop: 8,
    marginBottom: 20,
  },
  topContent: {
    height: 48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  learnMore: {
    width: 104,
    marginLeft: 24,
    marginTop: 8,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
});
