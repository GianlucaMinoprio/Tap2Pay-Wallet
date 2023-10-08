import React, { memo } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import NewFeedList from "./NewFeedList";
import { DATA_HOME } from "./NewFeed";
import TabBar from "components/TabBar";
import { Images } from "assets/images";
import { SceneMap, TabView } from "react-native-tab-view";
import useLayout from "hooks/useLayout";
import dayjs from "utils/dayjs";

const Contact = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom, width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [index, setIndex] = React.useState(0);

  const rightTopNavigation = React.useCallback(
    () => (
      <View style={styles.rTopNav}>
        <NavigationAction status="snow" icon="search" />
        <NavigationAction status="snow" icon="edit" />
      </View>
    ),
    []
  );
  const renderItem = React.useCallback(({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity activeOpacity={0.7} style={styles.avatar}>
          <View>
            <Avatar size="giant" source={item.avatar} />
            <Layout style={styles.iconOnl} />
          </View>
          <View>
            <View style={[styles.flexRow, { width: width - 116 }]}>
              <Text marginLeft={12} category="call-out" children={item.name} />
              <Text category="subhead" status="placeholder">
                {dayjs(item.lastSeen).format("DD/MM/YYYY")}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              maxWidth={width / 1.6}
              marginLeft={12}
              marginTop={8}
              category="subhead"
              status="snow"
            >
              {item.mess}
            </Text>
          </View>
        </TouchableOpacity>
        {item.image ? (
          <Image
            source={item.image}
            /* @ts-ignore */
            style={styles.image}
          />
        ) : undefined}
      </View>
    );
  }, []);
  const Tab1 = React.useCallback(() => {
    return (
      <View>
        <FlatList
          style={styles.tabContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(i, _) => i.id.toString()}
          data={DATA_Contact}
        />
      </View>
    );
  }, []);
  const Tab2 = React.useCallback(() => {
    return (
      <View>
        <FlatList
          style={styles.tabContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(i, _) => i.id.toString()}
          data={DATA_Contact}
        />
      </View>
    );
  }, []);
  const renderScene = SceneMap({
    first: Tab1,
    second: Tab2,
  });
  const [routes] = React.useState([
    { key: "first", title: "" },
    { key: "second", title: "" },
  ]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={rightTopNavigation}
        accessoryLeft={() => (
          <Text marginLeft={16} category="title4">
            Messenger
          </Text>
        )}
      />
      <NewFeedList
        showUnread
        data={DATA_HOME}
        level="1"
        accessoryLeft={
          <Button
            style={styles.btnStar}
            status="fill"
            accessoryRight={<Icon pack="assets" name="star" />}
          />
        }
      />
      <TabBar
        unreadData={"16"}
        tabs={["Active", "Unread"]}
        tabActive={index}
        onChangeTab={setIndex}
        status={["black", "placeholder"]}
        backgroundTab={theme["background-basic-color-2"]}
        backgroundTabActive={theme["color-primary-100"]}
        style={styles.tabBar}
      />
      <TabView
        showPageIndicator
        lazy
        lazyPreloadDistance={2000}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={styles.content}
        transitionStyle="scroll"
        renderTabBar={() => null}
      />
      <Layout style={[styles.bottom, { paddingBottom: bottom }]} level="2">
        <NavigationAction icon="happyFace" status="snow" />
        <TouchableOpacity onPress={goBack}>
          <Image
            source={Images.logo4}
            /* @ts-ignore */
            style={styles.logo}
          />
        </TouchableOpacity>
        <NavigationAction icon="chat" status="snow" />
      </Layout>
    </Container>
  );
});

export default Contact;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  image: {
    alignSelf: "center",
    marginTop: 28,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 8,
  },
  tabContainer: {
    paddingTop: 26,
  },
  iconOnl: {
    backgroundColor: "background-basic-color-4",
    height: 16,
    width: 16,
    borderRadius: 99,
    position: "absolute",
    right: 0,
    bottom: 0,
    borderColor: "background-basic-color-1",
    borderWidth: 2,
  },
  btnStar: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: "background-basic-color-2",
    marginLeft: 24,
  },
  tabBar: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
  rTopNav: {
    flexDirection: "row",
  },
  avatar: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  item: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  bottom: {
    borderTopLeftRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopRightRadius: 24,
    paddingHorizontal: 56,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});
const DATA_Contact = [
  {
    id: 0,
    name: "Christine Stewart",
    avatar: Images.toyFace1,
    lastSeen: 1630986664000,
    image: Images.rectangle5,
    mess: "What's the secret to a successful, tell me?",
  },
  {
    id: 1,
    name: "Marion Daniels",
    avatar: Images.toyFace6,
    lastSeen: 1630986664000,
    mess: "What's the secret to a successful, tell me?",
  },
  {
    id: 2,
    name: "Walter Turner",
    avatar: Images.toyFace2,
    lastSeen: 1630986664000,
    mess: "What's the secret to a successful, tell me?",
  },
  {
    id: 3,
    name: "Willie Harvey",
    avatar: Images.toyFace6,
    lastSeen: 1630986664000,
    mess: "What's the secret to a successful, tell me?",
  },
  {
    id: 4,
    name: "Willie Harvey",
    avatar: Images.toyFace3,
    lastSeen: 1630986664000,
    mess: "What's the secret to a successful, tell me?",
  },
];
