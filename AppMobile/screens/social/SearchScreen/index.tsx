import React, { memo } from "react";
import { FlatList, Image, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Layout,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

const SearchScr = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const { goBack } = useNavigation();
  const renderImage = React.useCallback(
    ({ item }) => (
      <View>
        <Image
          source={item}
          style={{
            width: (width - 48) / 3,
            height: (width - 48) / 3,
            marginRight: 8,
            marginBottom: 8,
            borderRadius: 4,
          }}
        />
      </View>
    ),
    []
  );
  const renderHeader = React.useCallback(() => {
    return (
      <View>
        <Text
          uppercase
          status="placeholder"
          category="subhead"
          children="Trending"
          marginTop={20}
        />
        <View style={styles.tagView}>
          <Layout style={styles.tag} level="2">
            <Text category="caption1" status="placeholder" children="Game" />
          </Layout>
          <Layout style={styles.tag} level="2">
            <Text category="caption1" status="placeholder" children="NFT" />
          </Layout>
          <Layout style={styles.tag} level="2">
            <Text
              category="caption1"
              status="placeholder"
              children="Marketplace"
            />
          </Layout>
          <Layout style={styles.tag} level="2">
            <Text category="caption1" status="placeholder" children="Crypto" />
          </Layout>
        </View>
        <Text
          children="REcent search"
          uppercase
          status="placeholder"
          category="subhead"
          marginBottom={16}
        />
        <View style={{ marginLeft: -12 }}>
          <Button
            style={styles.btn}
            onPress={goBack}
            size="small"
            status="fill"
            accessoryLeft={<Icon pack="assets" name="search" />}
            children="What is NFT?"
          />
          <Button
            onPress={goBack}
            style={styles.btn}
            status="fill"
            size="small"
            accessoryLeft={<Icon pack="assets" name="search" />}
            children="Best coin search 2021"
          />
          <Button
            onPress={goBack}
            style={styles.btn}
            status="fill"
            size="small"
            accessoryLeft={<Icon pack="assets" name="search" />}
            children="become an author"
          />
        </View>
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryRight={() => (
          <Input
            accessoryLeft={(props) => (
              <Icon
                {...props}
                pack="assets"
                name="search16"
                style={styles.icon}
              />
            )}
            placeholder="Search every things "
            style={{ flex: 1 }}
          />
        )}
      />
      <FlatList
        data={DATA_Image}
        ListHeaderComponent={renderHeader}
        renderItem={renderImage}
        numColumns={3}
        contentContainerStyle={{ marginHorizontal: 16 }}
        horizontal={false}
        keyExtractor={(i, _) => _.toString()}
      />
    </Container>
  );
});

export default SearchScr;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 16,
  },
  btn: {
    justifyContent: "flex-start",
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  tag: {
    borderRadius: 16,
    padding: 8,
    marginRight: 8,
  },
  tagView: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 32,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-primary-100",
    marginLeft: 16,
    marginRight: 8,
  },
});
const DATA_Image = [
  Images.re01,
  Images.re02,
  Images.re03,
  Images.re04,
  Images.re05,
  Images.re06,
  Images.re07,
  Images.re07,
  Images.re08,
  Images.re09,
  Images.re01,
  Images.re02,
  Images.re03,
  Images.re04,
  Images.re05,
  Images.re06,
  Images.re07,
  Images.re07,
  Images.re08,
  Images.re09,
];
